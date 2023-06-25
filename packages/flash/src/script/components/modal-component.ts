import { setAudio } from "../functions/audio";
import { animeOut, animeIn } from "../modules/animation";

export class ModalComponent{
  protected modal: Element;
  protected audio: string | null;
  protected volume: number;
  protected timer: number;
  protected titre: string;
  protected container: HTMLElement | null;
  protected animation:{type:string,position:string};
  protected closeButton?:HTMLElement;
  protected openButton?:HTMLElement;

  constructor(modal: Element,container?: HTMLElement,animation={type:'slide',position:'top'}) {
    this.modal = modal;
    this.audio = modal.getAttribute('audio');
    this.volume = parseInt(modal.getAttribute('volume') || '1', 10);
    this.timer = parseInt(modal.getAttribute('timer') || '0', 10);
    this.titre = modal.getAttribute('titre') || '';
    modal.setAttribute('aria-hidden', 'true');
    this.container = container || null;
    this.animation = animation;
    this.closeButton;
    this.openButton;
  }

 close = (): void => {
    const modal = this.modal;
    modal.setAttribute('aria-hidden', 'true');
    animeOut(modal as HTMLElement,this.animation,undefined,350,this.closeButton);

  };

  open(){
    if(this.audio) {
      const audio = setAudio(this.audio);
      audio.volume = this.volume;
      audio.play();
    }
    const modal = this.modal;
    animeIn(modal as HTMLElement,this.animation,'null');
    const container = this.container;
    const h6 = this.modal.querySelector('.alert-header h6');

    if(h6)
    h6.innerHTML = this.titre;

    if(container)
    container.insertBefore(modal, container.firstChild);
    
    modal.setAttribute('aria-hidden', 'false');
    if(this.timer > 0) {
      setTimeout(() => {
        this.close();
      }, this.timer);
    }
    modal.setAttribute('aria-labelledby', 'modal');
    this.closeButton = modal.querySelector('#close-modal') as HTMLElement;
    this.closeButton?.addEventListener('click', this.close);
  }

}
