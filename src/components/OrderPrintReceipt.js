import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import { formatPrice, formatPriceZero } from "../utils/helpers";
import { Divider } from "@material-ui/core";

const orderstate = {
  orderno: "3333",
  subtitle: "Kiulap Branch",
  name: "Albert",
  phone: "67323232323",
  date: "11/10/2021",
};

const OrderReceipt = ({ orderstate }) => {
  const subtitle = "Order # " + orderstate.orderno;

  const footer = "Thank you";
  pdfMake.fonts = {
    Courier: {
      normal: "Courier",
      bold: "Courier-Bold",
      italics: "Courier-Oblique",
      bolditalics: "Courier-BoldOblique",
    },
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
    Times: {
      normal: "Times-Roman",
      bold: "Times-Bold",
      italics: "Times-Italic",
      bolditalics: "Times-BoldItalic",
    },
    Roboto: {
      normal: "Roboto-Regular.ttf",
      bold: "Roboto-Medium.ttf",
      italics: "Roboto-Italic.ttf",
      bolditalics: "Roboto-MediumItalic.ttf",
    },
    Symbol: {
      normal: "Symbol",
    },
    ZapfDingbats: {
      normal: "ZapfDingbats",
    },
  };

  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  const documentDefinition = {
    pageSize: "A4",
    pageOrientation: "portrait",
    content: [
      //   {
      //     image: "logo",
      //     width: 200,
      //   },
      { text: "Mita Tea Shop", style: "header" },
      { text: subtitle + "\n", style: "subheader" },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 5,
            x2: 500,
            y2: 5,
            lineWidth: 2,
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "\n",
          },
          {
            width: 20,
            text: "",
          },
          {
            width: "200",
            text: "",
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "Name ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: "200",
            text: orderstate.name,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "Phone ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: 200,
            text: orderstate.x1phone,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "Date ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: 200,
            text: orderstate.date,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "Delivery Mode ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: 200,
            text: orderstate.deliverymode,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "Payment Mode ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: 200,
            text: orderstate.paymentmode,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      { text: footer + "\n", style: "footer" },
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      text: {
        fontSize: 12,
        bold: false,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableOpacityExample: {
        margin: [0, 5, 0, 15],
        fillColor: "blue",
        fillOpacity: 0.3,
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
      //font: "Helvetica",
    },
    images: {
      logo: "https://res.cloudinary.com/dlmzwvakr/image/upload/v1626939253/appsmith/AppSutLogo_rakamz.jpg",
      img1: "./AppSutLogo.jpg",
    },
  };

  pdfMake.createPdf(documentDefinition).open();
};

export default OrderReceipt;
