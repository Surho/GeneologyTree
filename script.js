import test from './testData.js';
import getRandomColor from './utils/getRandomColor.js'

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
        // generations[familyMember.anc].generationNumber = familyMember.anc;
    });
    return generations;
}

const generations = buildGenerationsSchema();
const LAYER_RADIUS_STEP = 50,
      RADIANS_K = 0.0174533,
      TOTAL_RADIUS = LAYER_RADIUS_STEP * Object.keys(generations).length;

console.log(generations);

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

// totalRadius = LAYER_RADIUS_STEP * Object.keys(generations).length - LAYER_RADIUS_STEP;
//
//
// let currentAngle = 0;
// let startAngle = 360 * RADIANS_K;
// console.log(Object.entries(generations));
//
// Object.entries(generations).forEach((item, i) => {
//     if (typeof item == 'object' && item[1].length !== 1) {
//         let sectorAngleStep = startAngle / item[1].length;
//
//         item[1].forEach((familyMember, i) => {
//             let x1 = svg.parentNode.offsetWidth / 2 + LAYER_RADIUS_STEP * Math.cos(currentAngle),
//                 y1 = svg.parentNode.offsetHeight / 2 - LAYER_RADIUS_STEP * Math.sin(currentAngle),
//                 x2 = x1 + totalRadius * Math.cos(currentAngle),
//                 y2 = y1 - totalRadius * Math.sin(currentAngle);
//
//             let line = createLine(x1, y1, x2, y2);
//             line.setAttribute('data-index', i);
//             svg.append(line);
//             currentAngle += sectorAngleStep;
//         });
//         startAngle = startAngle / item[1].length;
//     }
// });

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
    if (sectorNumbers === 1) return;

    let [startAngle, endAngle] = [...angleRange],
        partAngleStep = (Math.abs(angleRange[0] - angleRange[1])) / sectorNumbers;

    for (let i = 0; i <= sectorNumbers; i++) {
        let line = calculateLineCoords(TOTAL_RADIUS, i * partAngleStep, startOffset);
        drawLine(line);
    }
}

// devideSector(LAYER_RADIUS_STEP, [180, 360], 3);

let container = document.querySelector('.container');
let currentRadius = TOTAL_RADIUS;
let generationsReversed = Object.entries(generations).reverse();
let svg = container.appendChild(createSvg());

generationsReversed.forEach((item, i) => {
    let circle = createCircle('50%', '50%', currentRadius);
    svg.appendChild(circle);
    currentRadius -= LAYER_RADIUS_STEP;
});

generations.forEach((generation, i) => {
   devideSector(LAYER_RADIUS_STEP, [])
});

