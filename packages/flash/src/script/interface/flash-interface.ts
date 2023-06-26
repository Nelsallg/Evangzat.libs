/// <reference types="vite/client" />


import { Flash } from "../modules/flash";
import { SVG } from "../components/custom.d";
import iconPath from "../../assets/icon/icon.svg";
import '../../../../../assets/style/flash.scss';
import { types } from "sass";

export interface FlashInterface {
  addFlash(...params:Array<any>): Flash;
  show(props: string | any, container?: HTMLElement): Flash;
  flashHTMLModel(...params:Array<any>): flashHTMLModel | string;
}

export class flashHTMLModel {
  static title?: string = "Succès";
  static icon?: string;
  static message: string;
  static type?: string;
  [x: string]: any;
  static closeButton: string | boolean = true;
  type?:string;
  message:string;
  title?:string;
  icon?:string;
  
  constructor(message: string, title?: string, icon?: string,type?:string) {
    this.message = message;
    this.title = title;
    this.icon = this.setIcon(type)??icon;
    this.type = type;
  }

  public static PARENT(): string {
    return `<span class="flash-header">
                <h6>${this.title}</h6>
                ${SVG('close-modal',iconPath)}
            </span>
            <span class="flash-content">
            <h6>${this.icon}</h6>
                <h6 class="flash-message">
                    ${this.message}
                </h6>
            </span>`;
  }

  public setMessage(message: string): void {
    flashHTMLModel.message = message;
  }

  public getMessage(): string {
    return flashHTMLModel.message;
  }

  public setTitle(title: string): void {
    flashHTMLModel.title = title;
  }

  public getTitle(): string|undefined {
    return flashHTMLModel.title;
  }

  public setIcon(type?:string):string|null{
    console.log(type)
    if(undefined !== type)
    switch (type) {
      case 'success':
        return this.icon = SVG(type,iconPath);
      case 'info':
        return this.icon = SVG(type,iconPath);
      case 'warning':
        return this.icon = SVG(type,iconPath);
      case 'error':
        return this.icon = SVG(type,iconPath);
      default:
        return null;
    }
    return null;
  }
}
