import test from './testData.js';
import roundTo from './utils/rountTo.js'
import getRandomColor from './utils/getRandomColor.js'

const LAYER_RADIUS_STEP = 50,
      RADIANS_K = 0.0174533,
      BASE_HSL = [0, 50, 70];

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
        svgBoilerplate.setAttribute('shape-rendering', 'auto');
    }

    Object.entries(props).forEach((entry) => {
        let [name, value] = [...entry];
        svgBoilerplate.setAttribute(name, value);
    });
    // let group = document.createElement('g');
    // if(vector !== 'svg') {
    //     group.append(svgBoilerplate);
    // }
    // return (vector !== 'svg') ? group : svgBoilerplate;
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

function createPath(path) {
    return createVector('path', {
        d: path,
        fill: getRandomColor(),
        stroke: 'red'
    })
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

function calculateLineCoords(angle, offsetFromCenter) {
    angle = angle * RADIANS_K;
    let x1, y1, x2, y2,
        svgCenter = {
            x: svg.parentNode.offsetWidth / 2,
            y: svg.parentNode.offsetHeight / 2
        };

    x1 = svgCenter.x + offsetFromCenter * Math.cos(angle),
    y1 = svgCenter.y - offsetFromCenter * Math.sin(angle),
    x2 = x1 + LAYER_RADIUS_STEP * Math.cos(angle),
    y2 = y1 - LAYER_RADIUS_STEP * Math.sin(angle);

    return {x1, y1, x2, y2};
}

function drawLine(line) {
    let lineCoords = createLine(line.x1, line.y1, line.x2, line.y2);
    svg.append(lineCoords);
}

function devideSector(startOffset, angleRange, sectorNumbers) {
    if (sectorNumbers === 1 || sectorNumbers === 0) return;

    let [startAngle, endAngle] = [...angleRange],
        partAngleStep = (Math.abs(startAngle - endAngle)) / sectorNumbers;

    for (let i = 0; i <= sectorNumbers; i++) {
        let line = calculateLineCoords(startAngle + (i * partAngleStep), startOffset);
        drawLine(line);
    }
}
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

function mixInDiagramData(arr, sectorStart, sectorEnd, step, generationLayer) {

    if (arr.children.length) {
        arr.children.forEach((child, i) => {

            child.sectorRange = [sectorStart, sectorStart + step];
            child.generationLayer = generationLayer;
            child.radiusRange = [];
            child.radiusRange[0] =(child.generationLayer === 0)
                                        ? LAYER_RADIUS_STEP
                                        : LAYER_RADIUS_STEP+ LAYER_RADIUS_STEP * child.generationLayer;
            child.radiusRange[1] = child.radiusRange[0] + LAYER_RADIUS_STEP;


            sectorStart = child.sectorRange[1];
            sectorEnd = sectorStart + step;

            let nextLayer = child.generationLayer + 1;

            mixInDiagramData(child, ...child.sectorRange, Math.abs(sectorEnd - sectorStart) / child.children.length, nextLayer);
        })
    }
}

mixInDiagramData(originChildrenArray, sectorStart, sectorEnd, step, 0);


console.log(originChildrenArray);

////////////////-


////////////////+
function drawSector(radius1, radius2, line1, line2) {
    let path = `
        M ${line1.x1} ${line1.y1}
        A ${radius1} ${radius1} 0 0 0 ${line2.x1} ${line2.y1}
        L ${line2.x1} ${line2.y1} ${line2.x2} ${line2.y2}
        A ${radius2} ${radius2} 0 0 1 ${line1.x2} ${line1.y2}
        L ${line1.x2} ${line1.y2} ${line1.x1} ${line1.y1}
        `;

    svg.append(createPath(path));
}
////////////////-

let container = document.querySelector('.container'),
    generationsReversed = Object.entries(generations).reverse(),
    biggestRadius = LAYER_RADIUS_STEP * generationsReversed.length,
    svg = container.appendChild(createSvg());

function markChildren(children) {
    if (children.length) {
        children.forEach((child, i) => {
            let currentOffset = LAYER_RADIUS_STEP + LAYER_RADIUS_STEP * child.generationLayer,
                line1Coords = calculateLineCoords(child.sectorRange[0], currentOffset),
                line2Coords = calculateLineCoords(child.sectorRange[1], currentOffset);

                drawSector(child.radiusRange[0], child.radiusRange[1],line1Coords, line2Coords);

            // drawSector()
            markChildren(child.children);
        })
    }
}
markChildren(originChildrenArray.children);


// drawSector(50,20, 20, 40, 40);
//

console.log(originChildrenArray);




