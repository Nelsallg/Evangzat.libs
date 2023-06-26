import { Flash } from "../modules/flash";
import { SVG } from "../components/custom.d";

export interface FlashInterface {
  addFlash(
    message: string,
    type: string,
    duration: number,
    title?: string,
    container?: HTMLElement | null,
    icon?: string,
    closeButton?: boolean | string
  ): Flash;
  show(props: string | any, container?: HTMLElement): Flash;
  flashHTMLModel(message: string, title?: string, iconName?: string, closeButton?: string | boolean): flashHTMLModel | string;
}

class flashHTMLModel {
  static title?: string = "success";
  static iconName?: string = "success";
  static message: string;
  [x: string]: any;
  private isFlash: boolean = false;
  static closeButton: string | boolean = true;

  constructor(message: string, title?: string, iconName?: string) {
    this.message = message;
    this.title = title;
    this.iconName = iconName;
  }

  public static PARENT(): string {
    return `<span class="flash-header">
                <h6>${this.title}</h6>
                ${SVG('close-modal')}
            </span>
            <span class="flash-content">
            <h6>${SVG(this.iconName)}</h6>
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

  public setIcon(iconName: string): void {
    if (this.isFlash) throw new Error("You can't change the Icon after you have called `show`");
    switch (iconName) {
      case 'success':
        this.icon = SVG(iconName);
        break;
      case 'info':
        this.icon = SVG(iconName);
        break;
      case 'warning':
        this.icon = SVG(iconName);
        break;
      case 'error':
        this.icon = SVG(iconName);
        break;
      default:
        console.log(`The icon ${iconName} is not supported`);
        break;
    }
  }
}

export { flashHTMLModel }; // Ajout de l'exportation de la classe
