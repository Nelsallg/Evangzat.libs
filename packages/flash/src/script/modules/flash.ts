import { $$ } from "../functions/dom";
import { ModalComponent } from "../components/modal-component"
import { FlashInterface, flashHTMLModel } from "../interface/flash-interface";

export class Flash implements FlashInterface{
  
  private static HTML:string|any;

  addFlash(
    message:string, 
    type='danger', 
    timer=0,
    title?:string, 
    container?:HTMLElement|null, 
    icon?:string,
    closeButton?:boolean|string): Flash
  {
    let flash = Flash.create(timer,type);
    this.show({
      message:`${message}`,
      flashBox: flash,
      container:container,
      type: type,
      timer: timer,
      title:title,
      icon:icon,
      closeButton:closeButton??true,
    });
    return this;
  }

 show(props:string|any, container?:HTMLElement):Flash
  {
    let flashBox;
    let datas;
    switch (typeof props) {
      case 'string':
        flashBox = $$(props) as HTMLElement;
        break;
      default:
        datas = {
          message: props.message, 
          container: props.container,
          icon: props.icon,
          timer: props.timer,
          type: props.type,
          flashBox: props.flashBox,
          title: props.title,
          closeButton:props.closeButton
        };
        break;
    }
      
    if(flashBox && flashBox instanceof  HTMLElement){
      const message = flashBox.innerText;
      const icon = flashBox.getAttribute("icon") as string;
      const closeButton = flashBox.getAttribute("closeButton") as string;
      flashBox.innerHTML = this.flashHTMLModel(message,icon,closeButton) ;
      let modalComponent = new ModalComponent(flashBox, container);
      modalComponent.open();
      return this;
    }
    if(datas){
      const message = datas.message;
      const icon = datas.icon;
      const container = datas.container;
      const closeButton = datas.closeButton;
      const flashBox = datas.flashBox;
      const title = datas.title;
      flashBox.innerHTML = this.flashHTMLModel(message,icon,closeButton,title);
      let modalComponent = new ModalComponent(flashBox,container);
      modalComponent.open();
    }
    return this;
  }

  public flashHTMLModel(message:string,icon?:string,closeButton?:string|boolean,title?:string):string
  {
    flashHTMLModel.message = message;
    flashHTMLModel.iconName = icon;
    flashHTMLModel.closeButton = closeButton? 'true': false;
    flashHTMLModel.title = title;
    return flashHTMLModel.PARENT();
  }
      
  private static create(timer=0, type='danger')
  {
    let lastFlashBox = $$('.flash') as HTMLElement;
    if(lastFlashBox)
    lastFlashBox.remove();

    let flashBox = document.createElement('flash');
    flashBox.setAttribute('class',`flash-box flashtype-${type}`)
    flashBox.setAttribute('timer', `${timer}`);

    return flashBox;
  }
}