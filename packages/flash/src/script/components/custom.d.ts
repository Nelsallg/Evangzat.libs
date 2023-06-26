export function SVG(iconName?:string,iconPath?:string,attributes?:string=""):string {
    const content =  `<svg ${attributes}><use xlink:href="${iconPath}#${iconName}"></use></svg>`;
    return content;
}
