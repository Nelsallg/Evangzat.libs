import { $$ } from "../functions/dom";
import { ModalComponent } from "../components/modal-component"

export class Flash{
  private static HTML:string;

  public static addFlash(
    message:string, 
    type='danger', 
    timer=0, 
    action?:string, 
    model?:string, 
    container?:HTMLElement, 
    icon?:string,
    closeButton?:boolean|string): Flash
  {
    let flash = Flash.create(timer,type,model);
    this.setFlashProperties({
      message:`${message}`,
      flashBox: flash,
      action: action,
      container:container,
      type: type,
      timer: timer,
      model:model,
      icon:icon,
      closeButton:closeButton??true,
    });
    return this;
  }

  public static setFlashProperties(props:string|any, container?:HTMLElement):Flash
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
          action: props.action, 
          container: props.container,
          icon: props.icon,
          timer: props.timer,
          type: props.type,
          flashBox: props.flash,
          model: props.model,
          closeButton:props.closeButton
        };
        break;
    }
      
    if(flashBox && flashBox instanceof  HTMLElement){
      const message = flashBox.innerText;
      const icon = flashBox.getAttribute("icon") as string;
      const close_button = flashBox.getAttribute("closeButton") as string;
      flashBox.innerHTML = this.flasHtmlContent(message,icon,close_button);
      let modal_component = new ModalComponent(flashBox, container);
      modal_component.open();
      return this;
    }
    if(datas){
      const message = datas.message;
      const timer = datas.timer;
      const type = datas.type;
      const icon = datas.icon;
      const model = datas.model;
      const container = datas.container;
      const close_button = datas.closeButton;
      flashBox = Flash.create(timer,type,model)
      const messageContainer = flashBox.querySelector('.alert') as HTMLElement;
      messageContainer.innerHTML = this.flasHtmlContent(message,icon,close_button);
      let modal_component = new ModalComponent(flashBox, container);
      modal_component.open();
    }
    return this;
  }

  private static flasHtmlContent(message:string, icon?:string, closeButton?:string|boolean, title="Erreur"):string
  {
    let button;
    let setIcon;
    ('true' == closeButton)?
    button = "<svg id='close-modal'><use xlink:href='/svg/alert.svg#close-modal'></use></svg>":
    button = '';

    ('null' != icon)?
    setIcon = `<h6><svg><use xlink:href='/svg/alert.svg#${icon}'></use></svg></h6>`:
    setIcon = '';

    return `<span class="alert-header">
              <h6>${title}</h6>
              ${button}
            </span>
            <span class="alert-content">
                ${setIcon}
                <h6 class="text">
                    ${message}
                </h6>
            </span>`;
  }
      
  private static create(timer=0, type='danger', model?:string)
  {
    let lastFlashBox = $$('.alert') as HTMLElement;
    if(lastFlashBox)
    lastFlashBox.remove();

    let flashBox = document.createElement('flash');
    flashBox.setAttribute('class',`alert ${type}`)
    flashBox.setAttribute('timer', `${timer}`);

    return flashBox;
  }
}