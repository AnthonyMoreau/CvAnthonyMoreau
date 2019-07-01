class randomSkillsLoading {

    constructor(container,language, min, max, divisionSecond, pourcentage, random, transition){

        this.container = container;
        this.divisionSecond = divisionSecond;

        let count = 0;

        let Mycontainer = this.selectC_(this.container);
        let load = this.createDivWithClass('load');
        let p = document.createElement('span');
        Mycontainer.appendChild(load);
        load.appendChild(p);
        let skills = this.createDivWithClass('skills_');
        Mycontainer.appendChild(skills);
        let skill = this.createDivWithClass('skill_');
        skills.appendChild(skill);

        const c = this.selectC_(this.container + ' .load span');
        const s = this.selectC_(this.container + ' .skill_');

        function getRandom(mn, mx) {
            return (Math.random() * (mx - mn)) - mx
        }
        let i = setInterval(function () {
            if(random === 'true'){
                let r = Math.round(Math.random() * getRandom(min, max));
                count -= r;
            } else {
                count++
            }
            if(count >= pourcentage){
                count = pourcentage;
                clearInterval(i)
            }if(count === pourcentage){
                c.innerHTML = count + '%';
            } else {
                c.innerHTML = language + ' ' + count + "%";
            }
            s.style.width = count + "%";
            if(transition != null){
                s.style.transition = "width "+ transition +"s linear"
            }
        }, 1000/this.divisionSecond);
    }

    createDivWithClass(maClass){
        let p = document.createElement('div');
        p.setAttribute('class', maClass);
        return p
    }
    selectC_(maClass){
        return document.querySelector(maClass);
    }
}
class Caroussel {
    /**
     * @param {HTMLElement} element
     * @param options
     * @param {Object} options.slidesToScroll
     * @param {Object} options.slidesVisible
     * @param {boolean} options.loop
     */
    constructor (element, options = {}){
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 2,
            slidesVisible: 2,
            loop: true
        }, options);
        let children = [].slice.call(element.children);
        this.isMobile = false;
        this.currentItem = 0;
        this.moveCallBack = [];

        //MODIFICATION ELEMENTS ----------
        this.root = this.createDivWithClass('caroussel');
        this.container = this.createDivWithClass('caroussel__container');
        // this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.items = children.map((child) => {
            let item = this.createDivWithClass('caroussel__item');
            item.appendChild(child);
            this.container.appendChild(item);
            return item
        });
        this.setStyle();
        this.createNavigation();

        //EVENEMENTS----------
        this.moveCallBack.forEach(cb => cb(0));
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.root.addEventListener('keyup', (e) => {
            if(e.key === 'ArrowRight' || (e.key === 'Right')) {
                this.next()
            }
            if(e.key === 'ArrowLeft' || (e.key === 'Left')) {
                this.previous()
            }
        })
    }

    /**
     * definit les bonnes dimension
     */
    setStyle() {
        let ratio = this.items.length / this.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => {
            item.style.width = (100 / this.slidesVisible) / ratio + "%";
        });

    }

    createNavigation() {
        let nextButton = this.createDivWithClass('caroussel__next');
        let previousButton = this.createDivWithClass('caroussel__previous');
        this.root.appendChild(nextButton);
        this.root.appendChild(previousButton);

        nextButton.addEventListener('click', this.next.bind(this));
        previousButton.addEventListener('click', this.previous.bind(this));

        if(this.options.loop === true) {
            return
        }

        this.onMove(index => {
            if (index === 0) {
                previousButton.classList.add('caroussel_previous--hidden')
            } else {
                previousButton.classList.remove('caroussel_previous--hidden')
            }
            if(this.items[this.currentItem + this.slidesVisible] === undefined) {
                nextButton.classList.add('caroussel_next--hidden')
            } else {
                nextButton.classList.remove('caroussel_next--hidden')
            }
        })
    }

    next() {
        this.gotToItem(this.currentItem + this.slidesToScroll)
    }
    previous() {
        this.gotToItem(this.currentItem - this.slidesToScroll)

    }

    gotToItem(index) {
        if (index < 0){
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined && index > this.currentItem){
            index = 0
        }
        let translateX = index * (-100 / this.items.length);
        this.container.style.transform = 'translate3d(' + translateX + '% , 0, 0)';
        this.currentItem = index;
        this.moveCallBack.forEach(cb => cb(index))
    }

    onWindowResize() {
        let mobile = window.innerWidth < 800;
        if (mobile !== this.isMobile) {
            this.isMobile = mobile;
            this.setStyle();
            this.moveCallBack.forEach(cb => cb(this.currentItem))
        }
    }

    onMove(cb) {
        this.moveCallBack.push(cb)
    }

    /**
     *
     * @param {string} className
     * @returns {HTMLElement}
     */
    createDivWithClass(className){
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div
    }

    /**
     * @return {number}
     */
    get slidesToScroll () {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }
    get slidesVisible () {
        return this.isMobile ? 1 : this.options.slidesVisible
    }
}



