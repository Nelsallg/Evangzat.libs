import { $$ } from "../functions/dom";
import { ModalComponent } from "../components/modal-component"
import { FlashInterface, flashHTMLModel } from "../interface/flash-interface";
import { FormatParamsToObject } from "../utils/format-params-to-object";

FormatParamsToObject.ACCEPTED_PARAMS = [
  "message","type","timer","title","closeButton",
  "container","icon","onClickClose","autoHide",
  "delayAutoHide","destroyOnHide","zIndex",
  "animationIn","animationOut",
];

export class Flash implements FlashInterface{
  
 
  addFlash(...params:Array<any>): Flash
  {
    let properties = new FormatParamsToObject(params).getProperties();
    let flash = Flash.create(properties['timer'],properties['type']);
 
    this.show({
      message: properties['message'],
      flashBox: flash,
      container: properties['container'],
      type: properties['type'],
      timer: properties['timer'],
      title: properties['title'],
      icon: properties['icon'],
      closeButton: properties['closeButton']??true,
    } as any);
    return this;
  }

 show(params:string|Array<any>, container?:HTMLElement):Flash
  {
    
    let flashBox;
    let datas;
    switch (typeof params) {
      case 'string':
        flashBox = $$(params) as HTMLElement;
        break;
      default:
        let __params = params as any;
        datas = {
          message: __params['message'], 
          container: __params['container'],
          icon: __params['icon'],
          timer: __params['timer'],
          type: __params['type'],
          flashBox: __params['flashBox'],
          title: __params['title'],
          closeButton: __params['closeButton']
        };
        break;
    }
      
    if(flashBox && flashBox instanceof  HTMLElement){
      const message = flashBox.innerText;
      const icon = flashBox.getAttribute("icon") as string;
      const closeButton = flashBox.getAttribute("closeButton") as string;
      flashBox.innerHTML = this.flashHTMLModel({message:message,icon:icon,closeButton:closeButton}) ;
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
      const type = datas.type;
      flashBox.innerHTML = this.flashHTMLModel({title:title,type:type,message:message,icon:icon,closeButton:closeButton});
      let modalComponent = new ModalComponent(flashBox,container);
      modalComponent.open();
    }
    return this;
  }

  /**
   * @argument {string} params.message
   * @argument {string} params.icon
   * @argument {string|boolean} params.closeButton
   * @argument {string} [params.title]
   * @argument {string} params.type
   */
  public flashHTMLModel(...params:Array<any>):string
  {
  
    FormatParamsToObject.ACCEPTED_PARAMS = [
      "message","icon","type","closeButton","title",
    ]
    let properties = new FormatParamsToObject(params).getProperties();
    flashHTMLModel.message = properties['message'];
    flashHTMLModel.type = properties['type'];
    flashHTMLModel.closeButton = properties['closeButton'] ? 'true': false;
    flashHTMLModel.title = properties['title'];
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