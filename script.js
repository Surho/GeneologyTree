import test from './testData.js';
import getRandomColor from './utils/getRandomColor.js'

const LAYER_RADIUS_STEP = 50,
      RADIANS_K = 0.0174533;

////////////////+
function buildGenerationsSchema() {
    let generations = {};
    test.forEach((familyMember, i) => {
        if(familyMember.anc === null) return;
        if(generations[familyMember.anc]) {
            generations[familyMember.anc].push(familyMember);
        } else {
            generations[familyMember.anc] = [];
            generations[familyMember.anc].push(familyMember);
        }
    });
    return generations;
}
const generations = buildGenerationsSchema();
////////////////-

////////////////+
function buildGenerationsObj(startPoint) {
    startPoint.children = [];

    if (startPoint.childrenId.length) {
        startPoint.childrenId.forEach((childId) => {
            let child = Object.values(test).filter((child) => {
                return child.id === childId;
            })[0];
            startPoint.children.push(buildGenerationsObj(child));
        });
    } else {
        return startPoint;
    }
    return startPoint;
}

const generetaionTree = buildGenerationsObj(test[0]);
////////////////-

////////////////+
const TOTAL_RADIUS = LAYER_RADIUS_STEP * Object.keys(generations).length;

function createVector(vector = 'svg', props) {
    let svgBoilerplate = document.createElementNS("http://www.w3.org/2000/svg", vector);

    if(vector === 'svg') {
        svgBoilerplate.setAttribute('version', '1.1');
        svgBoilerplate.setAttribute('baseProfile', 'full');
    }

    Object.entries(props).forEach((entry) => {
        let [name, value] = [...entry];
        svgBoilerplate.setAttribute(name, value);
    });
    return svgBoilerplate;
}

function createSvg() {
    return  createVector('svg', {
        'width': '100%',
        'height': '100%',
    });
}

function createCircle(cx, cy, r) {
    return createVector('circle', {
        'cx': cx,
        'cy': cy,
        'r': r,
        'fill': getRandomColor(),
    });
}

function createLine(x1, y1, x2, y2) {
    return createVector('line', {
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2,
        fill: 'red',
        stroke: 'black'
    })
}

function calculateLineCoords(radius, angle, offsetFromCenter) {
    angle = angle * RADIANS_K;
    let x1, y1, x2, y2,
        svgCenter = {
            x: svg.parentNode.offsetWidth / 2,
            y: svg.parentNode.offsetHeight / 2
        };

    x1 = svgCenter.x + offsetFromCenter * Math.cos(angle);
    y1 = svgCenter.y - offsetFromCenter * Math.sin(angle);
    x2 = x1 + (radius - offsetFromCenter) * Math.cos(angle);
    y2 = y1 - (radius - offsetFromCenter) * Math.sin(angle);

    return [x1, y1, x2, y2];
}

function drawLine(lineCoords) {
    let line = createLine(...lineCoords);
    svg.append(line);
}

function devideSector(startOffset, angleRange, sectorNumbers) {
    if (sectorNumbers === 1 || sectorNumbers === 0) return;

    let [startAngle, endAngle] = [...angleRange],
        partAngleStep = (Math.abs(startAngle - endAngle)) / sectorNumbers;

    for (let i = 0; i <= sectorNumbers; i++) {
        let line = calculateLineCoords(TOTAL_RADIUS, startAngle + (i * partAngleStep), startOffset);
        drawLine(line);
    }
}

let container = document.querySelector('.container');
// let currentRadius = TOTAL_RADIUS;
// let generationsReversed = Object.entries(generations).reverse();
let svg = container.appendChild(createSvg());
////////////////-


////////////////+
function buildGenerarionObjClean() {
    let generatonMainBranches = {};
        generatonMainBranches.children = [];

    generetaionTree .children.forEach((item, i) => {
         generatonMainBranches.children.push(item);
    });
    return generatonMainBranches;
}

let originChildrenArray = buildGenerarionObjClean();
////////////////-



////////////////+   1)

// let originAncestor = test[0],
//     originChildrenIds = originAncestor.childrenId,
//     originChildren = test.filter(child => {
//         if(originChildrenIds.indexOf(child.id) !== -1) return true;
//     });
//
//     let originChildrenArray = [];
//     originChildren.forEach((originChild, i) => {
//         originChildrenArray.push(buildGenerationsObj(originChild));
//     });
////////////////-

////////////////+   2)

let sectorStart = 0,
    sectorEnd = 360,
    step = Math.abs(sectorEnd - sectorStart) / originChildrenArray.children.length;

function mixInDiagramData(arr, sectorStart, sectorEnd, step) {
    if (arr.children.length) {
        arr.children.forEach((child, i) => {

            child.sectorRange = [sectorStart, sectorStart + step];
            sectorStart = child.sectorRange[1];
            sectorEnd = sectorStart + step;

            mixInDiagramData(child, ...child.sectorRange, Math.abs(sectorEnd - sectorStart) / child.children.length);
        })
    }
}

mixInDiagramData(originChildrenArray, sectorStart, sectorEnd, step);
debugger;
////////////////-


// let mainBranches = buildGenerarionObjClean();
// function goThrouth(start) {
//     if (start.children.length) {
//         start.children.forEach((item, i) => {
//             console.log(item.children);
//             goThrouth(item);
//         })
//     }
// }
// goThrouth(mainBranches);


// let startAngle = 0,
//     endAngle = 360,
//     currentSector = [startAngle, endAngle],
//     sectorStep = Math.abs(startAngle - endAngle),
//     currentOffset = LAYER_RADIUS_STEP;

// function devideCircle(startTree) {
//
//     debugger;
//     if(startTree.children.length) {
//        devideSector(currentOffset, currentSector, startTree.children.length);
//
//        sectorStep = endAngle / startTree.children.length;
//        [startAngle, endAngle] = [endAngle, startAngle + sectorStep];
//        currentSector = [startAngle, endAngle];
//        currentOffset += LAYER_RADIUS_STEP;
//
//        startTree.children.forEach((branch, i) => {
//            devideCircle(branch);
//        })
//     }
// }
//
// devideCircle(generetaionTree);

// devideSector(0, [45, 360], 40);

;

// //1
// devideSector(LAYER_RADIUS_STEP, [0, 360], generetaionTree.children.length)
//
// //2
// devideSector(LAYER_RADIUS_STEP * 2, [0, 90], generetaionTree.children[0].children.length);
// devideSector(LAYER_RADIUS_STEP * 2, [90, 180], generetaionTree.children[1].children.length);
// devideSector(LAYER_RADIUS_STEP * 2, [180, 270], generetaionTree.children[2].children.length);
// devideSector(LAYER_RADIUS_STEP * 2, [270, 360], generetaionTree.children[3].children.length);
//
// //2-1
// devideSector(LAYER_RADIUS_STEP * 3, [0, 45], generetaionTree.children[0].children[0].children.length);
// devideSector(LAYER_RADIUS_STEP * 3, [0, 45], generetaionTree.children[1].children[0].children.length);
