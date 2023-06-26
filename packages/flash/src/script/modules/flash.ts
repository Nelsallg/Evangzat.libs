import { $$ } from "../functions/dom";
import { ModalComponent } from "../components/modal-component"
interface FlashOptions {
  el?: string;
  classes?: {
    base?: string;
    fade?: string;
    message?: string;
  };
}
export class Flash{
  private static HTML:string|any;

  constructor(options?: FlashOptions) {
    
  }
  public static show(type:string,message:string,options?: FlashOptions){
    if(!Flash.HTML){
      const template = `
      <div id="flash-box">
        <div class="flash flash-${type}">
        Message de test
        </div
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend',template);
      Flash.HTML= $$('.flash-box') as HTMLElement;
    }

    // console.log("FLASH",
    //   "type:",type,"message:",message,"options:",options)
    
    // options['message']=message;
    // options['type']=type;

    // new ModalComponent($$('.flash-box') as HTMLElement,options).open();
    // setTimeout(()=>{
    //   const flashBox = $$('.flash-box') as HTMLElement;
    //   flashBox.remove()
    // },3000);

  }
  public static addFlash(
    message:string, 
    type='danger', 
    timer=0, 
    action?:string, 
    model?:string, 
    container?:HTMLElement|null, 
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
          flashBox: props.flashBox,
          model: props.model,
          closeButton:props.closeButton
        };
        break;
    }
      
    if(flashBox && flashBox instanceof  HTMLElement){
      const message = flashBox.innerText;
      const icon = flashBox.getAttribute("icon") as string;
      const closeButton = flashBox.getAttribute("closeButton") as string;
      flashBox.innerHTML = this.flasHtmlContent(message,icon,closeButton);
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
      // const messageContainer = flashBox.querySelector('.alert') as HTMLElement;
      flashBox.innerHTML = this.flasHtmlContent(message,icon,closeButton);
      let modalComponent = new ModalComponent(flashBox,container);
      modalComponent.open();
    }
    return this;
  }

  private static flasHtmlContent(message:string, icon?:string, closeButton?:string|boolean, title="Erreur"):string
  {
  
    let button;
    let setIcon;
    
    ('true' == closeButton)?
    button = "<svg id='flash-close-button'><use xlink:href='../../assets/icon/alert.svg#close-modal'></use></svg>":
    button = '';

    ('null' != icon)?
    setIcon = `<h6><svg><use xlink:href='../../assets/icon/alert.svg#${icon}'></use></svg></h6>`:
    setIcon = '';

    return `<span class="flash-header">
              <h6>${title}</h6>
              ${button}
            </span>
            <span class="flash-content">
                ${setIcon}
                <h6 class="flash-message">
                    ${message}
                </h6>
            </span>`;
  }
      
  private static create(timer=0, type='danger', model?:string)
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