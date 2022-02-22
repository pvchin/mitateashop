import { PdfMakeWrapper, Txt } from "pdfmake-wrapper";
import vfsFonts from "pdfmake/build/vfs_fonts";
import JsBarcode from "jsbarcode/bin/JsBarcode";
import { formatPrice, formatPriceZero } from "../utils/helpers";
import { Divider } from "@material-ui/core";

function textToBase64Barcode(text) {
  var canvas = document.createElement("canvas");
  JsBarcode(canvas, text, { format: "CODE39", height: 25, width: 1 });
  return canvas.toDataURL("image/png");
}

const OrderReceipt = () => {
  const pdf = new PdfMakeWrapper();
  pdf.pageSize("A4");
  pdf.pageMargins([40, 60, 40, 60]);
  pdf.pageOrientation("portrait"); // 'portrait'
  pdf.styles({
    style1: {
      bold: true,
    },
    style2: {
      italics: true,
    },
  });
  pdf.defaultStyle({
    bold: true,
    fontSize: 15,
  });
  // pdf.pageSize({
  //   width: 595.28,
  //   height: "auto",
  // });

  pdf.add(new Txt("Hello world!").end);

  pdf.create().open(Window)
};

export default OrderReceipt;
