export function SVG(iconName?:string):string {
    const content =  `<svg><use xlink:href="../../assets/icons/icon.svg#${iconName}"></use></svg>`;
    return content;
}
