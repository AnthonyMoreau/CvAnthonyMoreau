function addClass(element, remove, add){
    element.classList.remove((remove));
    element.classList.add(add);
}
let loadSkillsButton = select(".chargement");
let mySkills = select(".My-skills");
let vitesse = 2.5;
let transition = .2;

loadSkillsButton.addEventListener("click", () => {
    addClass(loadSkillsButton, 'd-block','d-none');
    addClass(mySkills, 'd-none', 'd-block');

    let HTML = new randomSkillsLoading(
        '.HTML',
        'Loading',
        0,
        4,
        50 / vitesse,
        50,
        'false',
        transition),

        JavaScript = new randomSkillsLoading(
        '.JavaScript',
        'Loading',
        0,
        4,
        40 / vitesse,
        40,
        'false',
        transition),

        PHP = new randomSkillsLoading(
        '.PHP',
        'Loading',
        0,
        4,
        60 / vitesse,
        60,
        'false',
        transition),

        MAO = new randomSkillsLoading(
        '.MAO',
        'Loading',
        0,
        4,
        80 / vitesse,
        80,
        'false',
        transition),

        PAO = new randomSkillsLoading(
        '.PAO',
        'Loading',
        0,
        4,
        75 / vitesse,
        75,
        'false',
        transition),

        WORDPRESS = new randomSkillsLoading(
        '.WORDPRESS',
        'Loading',
        0,
        4,
        30 / vitesse,
        30,
        'false',
        transition);
});

