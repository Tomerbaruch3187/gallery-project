class Gallery {
    images = [];
    imgElem;
    currentImage = -1;
    interval;

    constructor(elemId, ...imageUrls) {
        this.images = imageUrls;

        const galleryElem = document.getElementById(elemId);
        galleryElem.classList.add("gallery");

        // הוספת הלחצן הימני
        const right = document.createElement('div');
        right.classList.add('arrow', 'right');
        right.addEventListener('click', () => this.prevImage());
        galleryElem.appendChild(right);

        // הוספת הלחצן השמאלי
        const left = document.createElement('div');
        left.classList.add('arrow', 'left');
        left.addEventListener('click', () => this.nextImage());
        galleryElem.appendChild(left);

        // יצירת אלמנט של התמונה
        this.imgElem = document.createElement("img");

        // הוספת אירועים לגלרייה
        galleryElem.addEventListener('mouseover', () => {
            this.stopAuto();
        });

        galleryElem.addEventListener('mouseout', () => {
            // כשמפעילים מחדש את הגלרייה זורקים אירוע כללי שמעדכן את כל הגלריות להסתנכרן
            const myEvent = new CustomEvent("startAllGallery");
            dispatchEvent(myEvent);
        });

        // הוספת אירוע כללי שיודע להאזין לכל הגלריות ע"מ לסנכרן אותם בקצב
        addEventListener('startAllGallery', () => this.startAuto());

        // הוספת התמונה לדף
        galleryElem.appendChild(this.imgElem);

        // לצורך הצגת התמונה הראשונה
        this.nextImage();
        this.startAuto();
    }

    nextImage() {
        this.currentImage++;

        if (this.currentImage >= this.images.length) {
            this.currentImage = 0;
        }

        this.imgElem.src = this.images[this.currentImage];
    }

    prevImage() {
        this.currentImage--;

        if (this.currentImage < 0) {
            this.currentImage = this.images.length - 1;
        }

        this.imgElem.src = this.images[this.currentImage];
    }

    startAuto() {
        clearInterval(this.interval);

        this.interval = setInterval(() => {
            this.nextImage();
        }, 2 * 1000);
    }

    stopAuto() {
        clearInterval(this.interval);
    }
}

const g1 = new Gallery("gallery1",
    "./images/תמונה (1).jpg",
    "./images/תמונה (2).jpg",
    "./images/תמונה (3).jpg",
    "./images/תמונה (4).jpg",
    "./images/תמונה (5).jpg");