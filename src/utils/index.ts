import { cloneDeep } from "lodash-es";
type TargetContext = "_self" | "_parent" | "_blank" | "_top";

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any }
) => {
  const { target = "_blank", ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(",")
  );
};

export const regexUrl = new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  "i"
);

/**
 *
 * @param menuList 全部动态的菜单树
 * @param flatPathList  角色对应的 菜单路径数组
 * @returns  授权的菜单树
 */
export function getAuthMenuList(
  menuList: any[],
  flatPathList: string[]
): any[] {
  const temp = cloneDeep(menuList);
  return temp.filter((item) => {
    item.children?.length &&
      (item.children = getAuthMenuList(item.children, flatPathList));
    return flatPathList.includes(item.path) || item.children?.length;
  });
}

export function getShowMenuList(menuList: any[]) {
  let temp = cloneDeep(menuList);
  return temp.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: any[]): any[] {
  let newMenuList = cloneDeep(menuList);
  return newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : []),
  ]);
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object}
 */
export const getAllBreadcrumbList = (
  menuList: any[],
  parent = [],
  result: { [key: string]: any } = {}
) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item];
    if (item.children)
      getAllBreadcrumbList(item.children, result[item.path], result);
  }
  return result;
};
