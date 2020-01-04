import { makeArray } from './_make-array';
import throttle from './_throttle';
import gsap from 'gsap';
import { reject } from 'lodash';

class BgImage {
  constructor () {
    this.$$sections = makeArray(document.querySelectorAll('.js-section'));

    this.current = 0;
    this.opt = [];
  }

  init () {
    this.$$sections.forEach((el, i) => {
      const result = {};
      result.el = el;
      result.childs = makeArray(el.querySelectorAll('.js-image'));

      this.opt[i] = result;
    });

    this.tinker();
    this.slide();
  }

  tinker () {
    window.requestAnimationFrame(() => this.tinker());

    throttle(() => this.animation(), 200000);
  }

  animation () {
    const length = this.opt.length - 1;

    if (this.current >= length) {
      this.current = 0;
    } else {
      this.current++;
    }

    this.slide();
  }

  slide () {
    const current = this.opt[this.current];
    const rejectOpt = reject(this.opt, (r, i) => {
      return this.current === i;
    });

    rejectOpt.forEach(c => {
      c.el.style.zIndex = 0;
    });

    current.childs.forEach(r => {
      gsap.to(r, {
        onStart: () => {
          current.el.style.zIndex = 5;
        },
        width: '33.333%',
        duration: 0.1,
        ease: 'none',
        onComplete: () => {
          rejectOpt.forEach(c => {
            c.childs.forEach(cc => {
              cc.style.width = '0%';
            });
          });
        }
      });
    });
  }
}

const bgImage = new BgImage();
bgImage.init();
