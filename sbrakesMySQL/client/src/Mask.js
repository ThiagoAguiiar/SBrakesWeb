import $ from "jquery";
import "jquery-mask-plugin/dist/jquery.mask.min";

export const MascaraPlaca = (selector) => {
  return $(selector).mask('AAA-0000');
};
