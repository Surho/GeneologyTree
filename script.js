import test from './testData.js';
import getRandomColor from './utils/getRandomColor.js'

const LAYER_RADIUS_STEP = 30;

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
        generations[familyMember.anc].generationNumber = familyMember.anc;
    });
    return generations;
}

function calculateRadiusNeeded(generations) {
    return Object.keys(generations).length * LAYER_RADIUS_STEP;
}

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

let genenerationsObj = buildGenerationsSchema(),
    neededRadius = calculateRadiusNeeded(genenerationsObj);


let container = document.querySelector('.container');

let generations = buildGenerationsSchema();
let totalRadius = LAYER_RADIUS_STEP * Object.keys(generations).length;
let generetaionsReversed = Object.entries(generations).reverse();
let svg = container.appendChild(createSvg());

generetaionsReversed.forEach((item, i) => {
    let circle = createCircle('50%', '50%', totalRadius);
    totalRadius -= LAYER_RADIUS_STEP;
    svg.appendChild(circle);
});

