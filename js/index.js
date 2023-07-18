const baseUrl = "./";

// path in for default will is save from the outside  src="./../js/index.js"

let colorAdjArr = [
  "getDarkContrastHTML",
  "getLowContrastHTML",
  "getHighContrastHTML",
  "getHighSaturationHTML",
  "getFontColorHTML",
  "getLowSaturationHTML",
  "getBackGroundColorHTML",
  "getMonoChromeHTML",
  "getTintColorHTML",
];

let colorContrastArr = [];

let contentAdjArray = [
  "getAlighLeftHTML",
  "getTextCenterHTML",
  "getTextAlighRightHTML",
  "getTextMagnifierHTML",
  "getContentScaleHTML",
  "getParaWidthHTML",
  "getLineHeightHTML",
  "getReadableFontHTML",
  "getFontSizeHTML",
  "getHighLightsTitleHTML",
  "getAdjustLetterSpacingHTML",
  "getHightLightLinksHTML",
  "getWordSpacingHTML",
  "getHighlightsParaHTML",
];
let orientAdjArray = [
  "getBigBlackCursorHTML",
  "getBigWhiteCursorHTML",
  "getReaderModeHTML",
  "getHideImageHTML",
  "getHReadingGuideHTML",
  "getImageDescriptionHTML",
  "getReadingMaskHTML",
  "getAutoScrollHTML",
];

function onLoadWindow(config) {
  var globeId = "cubet-plugin";
  var contrastLastClicked = "";
  var lastClickedColor = "";
  var lastClickedTint = "";
  var lastClickedBak = "";
  var head = document.getElementsByTagName("HEAD")[0];
  var bakColor = true;
  var textColor = true;
  var tintColor = true;
  var titleHighlight = false;
  var paraHighlight = false;
  let linksHighLight = false;
  let readableFontToggleBtn = false;
  let textAlignBtn = false;
  let fontSizeToggleBtn = false;
  let lineHeightToggleBtn = false;
  let lineHeightScale = 1.5;
  let letterSpacingScale = 1.5;
  var readerMode = false;
  var hideImages = false;
  var paraWidth = false;
  var readingGuide = false;
  var imageDescriptions = false;
  var readingMask = false;
  var textMagnifier = false;
  var autoScroll = false;
  var wordSpacingScale = 8;
  const version = "1.0.0";
  var voices = [];
  var textToSpeaks = false;
  var msg = "";

  let cubetBodyColor = config.backgroundColor
    ? config.backgroundColor
    : "#36c0c2";
  let cubetMainIMg = config.image
    ? config.image
    : `${baseUrl}assets/images/cubet-access.png`;
  let positionCubet = config.position; // setting config
  var colorsArray = {
    1: "#0089d3",
    2: "#8d56bd",
    3: "#db3a35",
    4: "#d07021",
    5: "#26999f",
    6: "#4d7831",
    7: "#ffffff",
    8: "#000000",
    9: "#9f9947",
    10: "#a9568d",
  };
  let cursorPointer = {
    //button map
    blackCursor: {
      pointerUrl: "https://acsbapp.com/apps/app/dist/media/pointer.svg",
      cursorUrl: "https://acsbapp.com/apps/app/dist/media/cursor.svg",
    },

    whiteCursor: {
      pointerUrl: "https://acsbapp.com/apps/app/dist/media/pointer2.svg",
      cursorUrl: "https://acsbapp.com/apps/app/dist/media/cursor2.svg",
    },
  };
  var colorButtons = {
    DarkContrast: {
      name: "dark",
      isEnable: false,
      index: 0,
      property: {
        element: "filter",
        value: "invert(1) hue-rotate(85deg)",
        name: "dark",
      },
    },
    LowContrast: {
      name: "low",
      isEnable: false,
      index: 1,
      property: { element: "filter", value: "contrast(50%)" },
    },
    HighContrast: {
      name: "high",
      isEnable: false,
      index: 2,
      property: { element: "filter", value: "contrast(135%)" },
    },
    HighSaturation: {
      name: "highSaturation",
      isEnable: false,
      index: 3,
      property: { element: "filter", value: "saturate(4)" },
    },
    LowSaturation: {
      name: "lowSaturation",
      isEnable: false,
      index: 4,
      property: { element: "filter", value: "saturate(50%)" },
    },
    MonoChrome: {
      name: "monoChrome",
      isEnable: false,
      index: 5,
      property: { element: "filter", value: "grayscale(100%)" },
    },
  };

  var fontAlign = [
    {
      name: "Align Left",
      isEnable: false,
      index: 0,

      property: {
        element: "text-align",
        value: "left",
      },
    },
    {
      name: "Align Center",
      isEnable: false,
      index: 1,
      property: {
        element: "text-align",
        value: "center",
      },
    },
    {
      name: "Align Right",
      isEnable: false,
      index: 2,
      property: {
        element: "text-align",
        value: "right",
      },
    },
  ];

  // Create new link Element

  var makediv = document.createElement("div");
  makediv.id = globeId;
  makediv.style.position = "relative";
  makediv.innerHTML =
    `
  <div class="cubet-plugin-css ">
  <div class="icon" id="iconMenu">
<img id="menuStart" src=${cubetMainIMg} alt="Cubility">
</div>
<div class="plugin-outer"  style="--cubet-background-color: ${cubetBodyColor};"id="pluginOuter">
<div class="title-areas" style="margin-bottom:5%">
    <a  class="close-section" id="closeIcon">
       <img id="cubet-image"src=${baseUrl}assets/images/close.svg alt="Close" title="Close" width="17">
    </a>
    <a  class="close-icon" id="rightArrow">
    <img id="cubet-image"src=${baseUrl}assets/images/right.svg alt="Right" width="30">
 </a>
    <a  class="close-icon" id="leftArrow">
    <img id="cubet-image"src=${baseUrl}assets/images/left.svg alt="Left" width="23">
 </a>
    <h3>Cubility </h3>
    <h6 class="sub-title">The Accessibility Plugin
    <a  id="reset" class="btn btn-light bg-white text-primary px-4 reset-icons">
    <img id="reset" src=${baseUrl}assets/images/reset.svg alt="reset" title="Reset" width="13">
 </a>
    </h6>
  
</div>
<div class="scroll-inside">
<div class="color-adjust">
    <h6 class="fw-bold mb-2">Color Adjustments</h6>
    <div class="row gx-3">` +
    `${setColorAdj()}` +
    `</div>
    </div>
<div class="content-adjust">
    <h6 class="fw-bold mb-2">Content Adjustments</h6>
    <div class="row gx-3">` +
    `${setContentAdj()}` +
    `</div>
</div>
<div class="content-adjust">
    <h6 class="fw-bold mb-2">Orientation Adjustments</h6>` +
    ` <div class="row gx-3">` +
    `${setOrientAdj()}` +
    `</div>
  </div>
</div>
</div>
<div>
<h6 class="cubet-footer">&copy;&nbsp;Powered By <b>Cubet Technolabs</b>
<span class="version">V:${version}</span>
</h6>
</div>
</div>
</div>`;
  makediv.getElementsByClassName;
  // document.body.appendChild(makediv)
  var bodyTag = document.getElementsByTagName("body")[0];
  bodyTag.parentNode.insertBefore(makediv, bodyTag);
  // Append link element to HTML head

  document.getElementById("rightArrow").style.visibility = "hidden";
  document.getElementById("rightArrow").style.display = "none";

  setTimeout(() => {
    resetFilters();
  }, 1000);
  positionDiv(positionCubet); // positing the cubet ext
  /*............ start of font color...........*/
  document
    .querySelectorAll("#c1,#c2,#c3,#c4,#c5,#c6,#c7,#c8,#cancelColor")
    .forEach((eve) => {
      eve.addEventListener("click", (event) => {
        if (event.target.id) setFontColor(event.target.id);
      });
    });

  function setColorAdj() {
    let loopData = "";
    for (let i = 0; i < colorAdjArr.length; i++) {
      if (
        config[colorAdjArr[i]] ||
        [undefined, "", " "].includes(config[colorAdjArr[i]])
      ) {
        loopData += `${eval(colorAdjArr[i] + "()")} `;
      }
    }

    // if(config.showContrast){
    //   colorContrastArr.map((res,i)=>{
    //     loopData+= `${eval(res + "()")} `;
    //   })
    // }

    return loopData;
  }
  function setContentAdj() {
    let loopData = "";
    for (let i = 0; i < contentAdjArray.length; i++) {
      if (
        config[contentAdjArray[i]] ||
        [undefined, "", " "].includes(config[contentAdjArray[i]])
      ) {
        loopData += `${eval(contentAdjArray[i] + "()")} `;
      }
    }
    return loopData;
  }
  function setOrientAdj() {
    let loopData = "";
    for (let i = 0; i < orientAdjArray.length; i++) {
      if (
        config[orientAdjArray[i]] ||
        [undefined, "", " "].includes(config[orientAdjArray[i]])
      ) {
        loopData += `${eval(orientAdjArray[i] + "()")} `;
      }
    }
    return loopData;
  }
  function setFontColor(id, reset) {
    if (id) {
      if (lastClickedColor == id && lastClickedColor != "" && !reset) {
        return;
      }
      if (id == "cancelColor") {
        textColor = false;
        if (lastClickedColor != id)
          document.getElementById(lastClickedColor)?.classList.remove("active");
      } else {
        textColor = true;
        if (reset) {
          textColor = false;
          document.getElementById(id).classList.remove("active");
        }
        if (lastClickedColor)
          document.getElementById(lastClickedColor).classList.remove("active");
        if (!reset) document.getElementById(id).classList.add("active");
      }
      lastClickedColor = id;
      let section = document.querySelectorAll(
        "span,div,li,ui,p,table,tr,td,a,h1,h2,h3,h4,h5,h6,th,input"
      );
      if (section) {
        for (let sections of section) {
          sections.style.setProperty(
            "color",
            textColor ? colorsArray[id.split("c")[1]] : "",
            "important"
          );
        }
      }
      recurrence("color");
      if (reset) id = "";
      setLocalStorage("color", id);
    }
  }
  /*.................end of font color.................. */

  /*............ start of font color...........*/
  document
    .querySelectorAll("#t1,#t2,#t3,#t4,#t5,#t6,#t9,#t10,#cancelTint")
    .forEach((eve) => {
      eve &&
        eve.addEventListener("click", (event) => {
          if (event.target.id) setTintColor(event.target.id);
        });
    });

  function setTintColor(id, reset) {
    if (id) {
      if (lastClickedTint == id && lastClickedTint != "" && !reset) {
        return;
      }
      if (id == "cancelTint") {
        tintColor = false;
        if (lastClickedTint != id) {
          if (lastClickedTint)
            document.getElementById(lastClickedTint).classList.remove("active");
        }
      } else {
        tintColor = true;
        if (reset) {
          tintColor = false;
          document.getElementById(id).classList.remove("active");
        }
        if (lastClickedTint)
          document.getElementById(lastClickedTint).classList.remove("active");
        if (!reset) document.getElementById(id).classList.add("active");
      }
      lastClickedTint = id;
      try {
        let div = document.getElementById("cubet-overlay");
        if (div) {
          div?.remove();
        }
      } catch (er) {}
      if (tintColor) {
        let elm = document.createElement("footer");
        elm.id = "cubet-overlay";
        let currentElm = document.querySelector("body");
        currentElm?.insertBefore(elm, currentElm.children[0]);
        let div = document.getElementById("cubet-overlay");
        div.classList.add("cubet-tint");
        div.style.setProperty(
          "background-color",
          colorsArray[id.split("t")[1]],
          "important"
        );
      } else {
        let div = document.getElementById("cubet-overlay");
        div?.remove();
      }
      // recurrence("color");
      // if (reset) id = "";
      setLocalStorage("tint", id);
    }
  }
  /*.................end of font color.................. */

  //background color changes event
  document
    .querySelectorAll("#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#cancelBakColor")
    .forEach((eve) => {
      eve &&
        eve.addEventListener("click", (event) => {
          if (event.target.id) {
            setBakColor(event.target.id);
          }
        });
    });

  function setBakColor(id, reset) {
    if (id) {
      if (id == lastClickedBak && lastClickedBak != "" && !reset) {
        return;
      }
      if (id == "cancelBakColor") {
        bakColor = false;
        if (lastClickedBak != id)
          document.getElementById(lastClickedBak)?.classList.remove("active");
      } else {
        bakColor = true;
        if (reset) {
          bakColor = false;
          document.getElementById(id).classList.remove("active");
        }
        if (lastClickedBak)
          document.getElementById(lastClickedBak)?.classList.remove("active");
        if (!reset) document.getElementById(id).classList.add("active");
      }
      lastClickedBak = id;
      let section = document.querySelectorAll(
        "span,div,li,ui,p,table,tr,td,a,h1,h2,h3,h4,h5,h6"
      );
      if (section) {
        for (let sections of section) {
          sections.style.setProperty(
            "background-color",
            bakColor ? colorsArray[id.split("b")[1]] : "",
            "important"
          );
        }
      }
      recurrence("background-color");
      if (reset) id = "";
      setLocalStorage("background-color", id);
    }
  }
  function recurrence(pro) {
    let tags = document
      .getElementById(globeId)
      .querySelectorAll("div,a,p,section,h1,h2,h3,h4,h5,h6,span,li,ui,table");
    for (let item of tags) {
      item.style.setProperty(pro, "", "important");
    }
    document.getElementById(globeId).style.color = "";
  }

  document
    .querySelectorAll(
      "#DarkContrast,#LowContrast,#HighContrast,#LowSaturation,#HighSaturation,#MonoChrome"
    )
    .forEach((eve) => {
      eve &&
        eve.addEventListener("click", (event) => {
          setContrast(event.target.id);
        });
    });

  //function for setting the contrast
  function setContrast(type, reset) {
    if (type) {
      colorButtons[type].isEnable = !colorButtons[type].isEnable;
      if (
        type != contrastLastClicked &&
        contrastLastClicked != "" &&
        type != ""
      ) {
        if (colorButtons[contrastLastClicked].isEnable) {
          document
            .getElementById(contrastLastClicked)
            .classList.remove("active");
          colorButtons[contrastLastClicked].isEnable = false;
        }
      }
      if (colorButtons[type]) {
        if (reset) {
          colorButtons[type].isEnable = false;
        }
        contrastLastClicked = type;
        if (colorButtons[type].isEnable)
          document.getElementById(type).classList.add("active");
        else document.getElementById(type).classList.remove("active");
        let color = colorButtons[type];
        document.querySelector("body").style.filter = color?.isEnable
          ? color?.property?.value
          : "";
        const media = document.querySelectorAll(
          "img, picture, video,image,svg,path,polygon,ellipse,stop"
        );
        const svg = document.querySelectorAll("svg,path,polygon,ellipse,stop");
        media.forEach((mediaItem) => {
          mediaItem.style.filter = color?.isEnable
            ? color?.name === "dark"
              ? "invert(1) hue-rotate(-90deg)"
              : ""
            : "";
          mediaItem.style.backgroundColor = color?.isEnable
            ? color?.name === "dark"
              ? "#ffffff85"
              : ""
            : "";
        });

        svg.forEach((svg) => {
          svg.style.filter = color?.isEnable
            ? color?.name === "dark"
              ? "invert(0)"
              : ""
            : ""; // for svg overrrideing
          svg.style.backgroundColor = color?.isEnable
            ? color?.name === "dark"
              ? "#ffffff85"
              : ""
            : ""; // for svg overrrideing
        });
        if (!color?.isEnable) type = "";
        if (reset) type = "";
        setLocalStorage("contrast", type);
        let imgTags = document
          .getElementById(globeId)
          .getElementsByTagName("img");
        for (let item of imgTags) {
          item.style.setProperty("filter", "", "important");
          item.style.setProperty("background-color", "", "important");
        }
      }
    }
  }

  //content scaling--------------------------------------------------->

  let contentScaling = document.getElementById("contentScaling");
  let contentScaleText = document.getElementById("contentScalingLabel");
  contentScaling &&
    contentScaling.addEventListener("input", (event) => {
      const params = {
        access_name: "content-scaling",
        access_index: 0,
        isEnable: true,
        property: {
          style: "zoom",
          value: getContentZoom(event.target.value),
          zoom: event.target.value,
        },
      };
      setLocalStorage("content-scaling", params);
      setContentScalingFun(params);
    });
  function setContentScalingFun(scaleValue) {
    if (scaleValue) {
      document.getElementById("contentScaling").value =
        scaleValue?.property?.zoom; // set the value
      document.getElementById("contentScalingLabel").textContent =
        scaleValue != null
          ? scaleValue.property.zoom > 0
            ? "+" + scaleValue.property.zoom
            : scaleValue.property.zoom
          : 0;
      let value = getContentZoom(scaleValue?.property.zoom);
      let section;
      section = document.querySelectorAll("body");
      if (section) {
        for (let sections of section) {
          sections.style.setProperty("zoom", value, "important");
        }
      }
    }
  }
  function getContentZoom(value) {
    let absValue = Math.abs(value);
    let afterabs = 10 - Number(absValue);
    if (value < 0) {
      return 0 + "." + afterabs; // -ve value
    }
    return 1 + "." + value;
  }

  //content scaling---------------------------------------------------end>

  /*......................start of word spacing.......................... */

  let wordSpacing = document.getElementById("wordSpacing");
  let wordSpacingText = document.getElementById("wordSpaceText");
  wordSpacing &&
    wordSpacing.addEventListener("input", (event) => {
      const params = {
        access_name: "word-spacing",
        access_index: 0,
        isEnable: true,
        property: {
          style: "word-spacing",
          value: getWordSpaceData(event.target.value),
          word: event.target.value,
        },
      };
      setLocalStorage("word-spacing", params);
      setWordSpacing(params);
    });

  function setWordSpacing(wordArg) {
    if (wordArg) {
      document.getElementById("wordSpacing").value = wordArg?.property?.word;
      document.getElementById("wordSpaceText").textContent =
        wordArg != null
          ? wordArg.property.word > 0
            ? "+" + wordArg.property.word
            : wordArg.property.word
          : 0;
      let section = document.body.querySelectorAll(
        "span,div,li,ui,p,table,tr,td,a,h1,h2,h3,h4,h5,h6"
      );
      if (section) {
        for (let sections of section) {
          sections.style.setProperty(
            wordArg.property.style,
            wordArg.isEnable ? wordArg.property.value + "px" : "normal",
            "important"
          );
        }
      }
    }
  }
  function getWordSpaceData(value) {
    return value == 0 ? 0 : value * wordSpacingScale;
  }

  /*..............end of word spacing.................. */

  //highlight links ---------------------------------------------------->

  let links = document.getElementById("highlight-links");
  links &&
    links.addEventListener("click", (event) => {
      linksHighLight = !linksHighLight;
      const object = {
        access_name: "highlight-links",
        access_index: 0,
        isEnable: linksHighLight,
        index: 11,
        property: {
          style: "outline",
          value: "#f00 solid 2px",
        },
      };
      setLocalStorage("highlight-links", object);
      setHighlightLinks(object);
    });
  function setHighlightLinks(linksHighLightArg) {
    linksHighLight = linksHighLightArg?.isEnable;
    if (linksHighLightArg) {
      if (linksHighLightArg.isEnable)
        document
          .getElementById(linksHighLightArg.access_name)
          .classList.add("active");
      else
        document
          .getElementById(linksHighLightArg.access_name)
          .classList.remove("active");
      let section;
      section = document.body.querySelectorAll("a");

      if (section) {
        for (let sections of section) {
          sections.style.setProperty(
            linksHighLightArg.property.style,
            linksHighLightArg.isEnable
              ? linksHighLightArg.property.value
              : "none",
            "important"
          );
        }
      }
    }
  }
  //highlight links ----------------------------------------------------End >

  //readable font ---------------------------------------------------------->

  let readable = document.getElementById("readable-fonts");
  readable &&
    readable.addEventListener("click", (event) => {
      readableFontToggleBtn = !readableFontToggleBtn;
      const object = {
        access_name: "readable-fonts",
        access_index: 0,
        isEnable: readableFontToggleBtn,
        index: 13,
        property: {
          style: "font-family",
          value: "Arial,Helvetica,sans-serif",
        },
      };

      setLocalStorage("readable-fonts", object);
      setReadableFont(object);
    });

  function setReadableFont(readfontArg) {
    readableFontToggleBtn = readfontArg?.isEnable;
    if (readfontArg) {
      if (readfontArg.isEnable)
        document
          .getElementById(readfontArg.access_name)
          .classList.add("active");
      else
        document
          .getElementById(readfontArg.access_name)
          .classList.remove("active");

      let section;
      section = document.body.querySelectorAll(
        "body,span,div,li,ui,p,table,tr,td,a,h1,h2,h3,h4,h5,h6,html"
      );
      if (section) {
        for (let sections of section) {
          sections.style.setProperty(
            readfontArg.property.style,
            readfontArg.isEnable ? readfontArg.property.value : "",
            "important"
          );
        }
      }
    }
  }
  //readable font ---------------------------------------------------------end >

  //font-align left,right,center,justify-------------------------------------->

  let productButtons = document.querySelectorAll(".textAlign");

  productButtons &&
    productButtons.forEach((productButton) => {
      productButton.addEventListener("click", (e) => {
        let button = e.currentTarget;
        productButtons.forEach((btn) => {
          btn !== button && btn.classList.remove("active");
        });

        button.classList.toggle("active");
        textAlignBtn = button.classList.contains("active");
        const splitId = button.getAttribute("id").split("-");
        const object = {
          access_name: "text-align",
          access_index: button.getAttribute("id"),
          isEnable: textAlignBtn,
          index: 11,
          property: {
            style: "text-align",
            value: splitId[1], // for getting the property name
          },
        };
        setLocalStorage("text-align", object);
        setTextAlign(object);
        // textAlignBtn=!textAlignBtn
      });
    });

  function setTextAlign(textAlignArg) {
    textAlignBtn = textAlignArg?.isEnable;

    // document.getElementById(textAlignArg.access_index).classList.add('active')
    if (textAlignArg) {
      if (!textAlignArg?.isEnable) {
        document
          .getElementById(textAlignArg.access_index)
          .classList.remove("active");
      } else {
        document
          .getElementById(textAlignArg.access_index)
          .classList.add("active");
      }
      let section;
      section = document.body.querySelectorAll(
        "span,div,li,ul,p,table,tr,td,a,h1,h2,h3,h4,h5,h6,html,body,nav"
      );
      if (section) {
        for (let sections of section) {
          sections.style.setProperty(
            textAlignArg.property.style,
            textAlignArg.isEnable ? textAlignArg.property.value : "",
            "important"
          );
        }
      }
    }
  }

  //font-align left,right,center,justify--------------------------------------end >

  //font size ------------------------------------------------------------------->
  let fontsizeScaling = document.getElementById("fontsizeScaling");
  let fontsizeScalingLabel = document.getElementById("fontsizeScalingLabel");
  fontsizeScaling &&
    fontsizeScaling.addEventListener("input", (event) => {
      fontSizeToggleBtn = !fontSizeToggleBtn;
      const object = {
        access_name: "font-size",
        access_index: 0,
        isEnable: fontSizeToggleBtn,
        index: 12,
        property: {
          style: "zoom",
          value: getContentZoom(event.target.value),
          fontSize: event.target.value,
        },
      };

      setLocalStorage("fontSize", object);
      setFontsize(object);
    });

  function setFontsize(fontsizeArg) {
    if (fontsizeArg) {
      fontsizeScaling.value = fontsizeArg?.property?.fontSize; // set the fontsize
      fontsizeScalingLabel.textContent =
        fontsizeArg != null
          ? fontsizeArg.property.fontSize > 0
            ? "+" + fontsizeArg.property.fontSize
            : fontsizeArg.property.fontSize
          : 0;
      let value = getContentZoom(fontsizeArg?.property.fontSize);
      let section;
      section = document.body.querySelectorAll(
        "span,li,ui,p,table,tr,td,a,h1,h2,h3,h4,h5,h6"
      );
      if (section) {
        for (let sections of section) {
          sections.style.setProperty("zoom", value, "important");
        }
      }
    }
  }

  //font size ----------------------------------------------------------------end >

  //line height----------------------------------------------------------------->

  let lineHeightScaling = document.getElementById("lineHeightScaling");
  let lineHeightScalingLabel = document.getElementById(
    "lineHeightScalingLabel"
  );
  lineHeightScaling &&
    lineHeightScaling.addEventListener("input", (event) => {
      lineHeightToggleBtn = !lineHeightToggleBtn;
      let lineHeight = event.target.value;
      const object = {
        access_name: "line-height",
        access_index: 0,
        isEnable: true,
        index: 13,
        property: {
          style: "line-height",
          value:
            lineHeight == 0
              ? ""
              : lineHeight < 0
              ? lineHeight == -1
                ? "3vh"
                : lineHeight == -2
                ? "2vh"
                : "1vh"
              : lineHeight * lineHeightScale + 5 + "vh",
          line: lineHeight,
        },
      };
      setLocalStorage("line-height", object);
      setLineHeight(object);
    });

  function setLineHeight(lineHeightArg) {
    if (lineHeightArg) {
      lineHeightScaling.value = lineHeightArg?.property?.line; // set the fontsize
      lineHeightScalingLabel.textContent =
        lineHeightArg != null
          ? lineHeightArg.property.line > 0
            ? "+" + lineHeightArg.property.line
            : lineHeightArg.property.line
          : 0;
      let section;
      section = document.body.querySelectorAll(
        "span,li,ui,p,table,tr,td,a,h1,h2,h3,h4,h5,h6"
      );
      if (section) {
        for (let sections of section) {
          sections.style.setProperty(
            "line-height",
            lineHeightArg?.property.value,
            "important"
          );
        }
      }
    }
  }
  //line height --------------------------------------------------------end >

  //letter spacing ----------------------------------------------------->
  let letterSpacingScaling = document.getElementById("letterSpacingScaling");
  let letterSpacingScalingLabel = document.getElementById(
    "letterSpacingScalingLabel"
  );
  letterSpacingScaling &&
    letterSpacingScaling.addEventListener("input", (event) => {
      lineHeightToggleBtn = !lineHeightToggleBtn;
      let letterSpacing = event.target.value;
      const object = {
        access_name: "letterSpacing",
        access_index: 0,
        isEnable: true,
        index: 8,
        property: {
          style: "letter-spacing",
          value:
            letterSpacing === 0
              ? (letterSpacing = 0)
              : letterSpacing * letterSpacingScale,

          letterspacing: letterSpacing,
        },
      };
      setLocalStorage("letter-spacing", object);
      setLetterSpacing(object);
    });

  function setLetterSpacing(letterSpacingArg) {
    letterSpacingScaling.value = letterSpacingArg?.property?.letterspacing; // set the fontsize
    letterSpacingScalingLabel.textContent =
      letterSpacingArg != null
        ? letterSpacingArg.property.letterspacing > 0
          ? "+" + letterSpacingArg.property.letterspacing
          : letterSpacingArg.property.letterspacing
        : 0;

    let section;
    section = document.body.querySelectorAll(
      "span,div,li,ui,p,table,tr,td,a,h1,h2,h3,h4,h5,h6,html"
    );
    if (section) {
      for (let sections of section) {
        sections.style.setProperty(
          letterSpacingArg.property.style,
          letterSpacingArg.isEnable
            ? letterSpacingArg.property.value + "px"
            : "normal",
          "important"
        );
      }
    }
  }

  //letter spacing ----------------------------------------------------end >

  /*........................start of reader mode .......................*/

  let readMode = document.getElementById("read-mode");
  readMode &&
    readMode.addEventListener("click", (event) => {
      readerMode = !readerMode;
      const object = {
        access_name: "read-mode",
        access_index: 0,
        isEnable: readerMode,
        index: 18,
        property: {
          style: ["max-width", "margin"],
          value: ["600px", "auto"],
        },
      };

      setLocalStorage("read-mode", object);
      setReadaMode(object);
    });

  function setReadaMode(readMode) {
    readableFontToggleBtn = readMode?.isEnable;
    if (readMode) {
      if (readMode.isEnable)
        document.getElementById(readMode.access_name).classList.add("active");
      else
        document
          .getElementById(readMode.access_name)
          .classList.remove("active");

      let section;
      section = document.body.querySelectorAll(
        "body,span,div,li,ui,p,table,tr,td,a,h1,h2,h3,h4,h5,h6,html"
      );
      if (section) {
        for (let sections of section) {
          sections.style.setProperty(
            readMode.property.style[0],
            readMode.isEnable ? readMode.property.value[0] : "",
            "important"
          );
          sections.style.setProperty(
            readMode.property.style[1],
            readMode.isEnable ? readMode.property.value[1] : "",
            "important"
          );
        }
      }
    }
  }
  /*....................end of reader mode....................*/

  /*........................start of hide images .......................*/

  let hImage = document.getElementById("hide-image");
  hImage &&
    hImage.addEventListener("click", (event) => {
      hideImages = !hideImages;
      const object = {
        access_name: "hide-image",
        access_index: 0,
        isEnable: hideImages,
        index: 18,
        property: {
          style: "visibility",
          value: ["hidden", "visible"],
        },
      };

      setLocalStorage("hide-image", object);
      setHideImages(object);
    });

  function setHideImages(hideImage) {
    hideImages = hideImage?.isEnable;
    if (hideImage) {
      if (hideImage.isEnable)
        document.getElementById(hideImage.access_name).classList.add("active");
      else
        document
          .getElementById(hideImage.access_name)
          .classList.remove("active");

      let section;
      section = document.body.querySelectorAll("img, picture, video,image");
      if (section) {
        for (let sections of section) {
          hideImage.isEnable
            ? sections.style.setProperty(
                hideImage.property.style,
                hideImage.property.value[0]
              )
            : sections.style.setProperty(
                hideImage.property.style,
                hideImage.property.value[1]
              );
        }
      }
    }
  }
  /*....................end of hide images....................*/

  /*........................start of Reading Guide .......................*/

  let readGui = document.getElementById("reading-guide");
  readGui &&
    readGui.addEventListener("click", (event) => {
      readingGuide = !readingGuide;
      const object = {
        access_name: "reading-guide",
        access_index: 0,
        isEnable: readingGuide,
        index: 18,
        property: {
          style: "",
          value: "",
        },
      };

      setLocalStorage("reading-guide", object);
      setReadingGuide(object);
    });

  function setReadingGuide(guide) {
    readingGuide = guide?.isEnable;
    if (guide) {
      if (guide.isEnable)
        document.getElementById(guide.access_name).classList.add("active");
      else
        document.getElementById(guide.access_name).classList.remove("active");

      if (guide.isEnable) {
        let elm = document.createElement("footer");
        elm.id = "cubet-move";
        let currentElm = document.querySelector("body");
        currentElm?.insertBefore(elm, currentElm.children[0]);
        let div = document.getElementById("cubet-move");
        div.classList.add("cubet-readingGuides");
        document.addEventListener("mousemove", (e) => {
          try {
            let div1 = document.getElementById("cubet-move");
            if (div1) {
              div1.style.setProperty("left", e.pageX - 240 + "px", "important");
              div1.style.setProperty("top", e.pageY - 18 + "px", "important");
            }
            // else {
            //   setReadingGuide(guide)
            // }
          } catch (err) {}
        });
      } else {
        let div = document.getElementById("cubet-move");
        if (div) div.remove();
      }
    }
  }
  /*....................end of Reading Guide....................*/

  /*........................start of Reading Mask .......................*/

  let readMasks = document.getElementById("reading-mask");
  readMasks &&
    readMasks.addEventListener("click", (event) => {
      readingMask = !readingMask;
      const object = {
        access_name: "reading-mask",
        access_index: 0,
        isEnable: readingMask,
        index: 18,
        property: {
          style: "visibility",
          value: ["hidden", "visible"],
        },
      };

      setLocalStorage("reading-mask", object);
      setReadingMask(object);
    });

  function setReadingMask(mask) {
    readingMask = mask?.isEnable;
    if (mask) {
      if (mask.isEnable)
        document.getElementById(mask.access_name).classList.add("active");
      else document.getElementById(mask.access_name).classList.remove("active");

      if (mask.isEnable) {
        try {
          let mask1 = document.getElementById("cubet-readingmask2");
          if (mask1) mask1?.remove();
          let mask2 = document.getElementById("cubet-readingmask");
          if (mask2) mask2?.remove();
        } catch (err) {}
        let elm2 = document.createElement("footer");
        elm2.id = "cubet-readingmask2";
        let elm = document.createElement("footer");
        elm.id = "cubet-readingmask";
        let currentElm = document.querySelector("body");
        currentElm?.insertBefore(elm2, currentElm.children[0]);
        currentElm?.insertBefore(elm, currentElm.children[0]);
        let div = document.getElementById("cubet-readingmask");
        div.classList.add("cubet-scale-1");

        let div2 = document.getElementById("cubet-readingmask2");
        div2.classList.add("cubet-scale-2");
        document.addEventListener("mousemove", (e) => {
          try {
            let div1 = document.getElementById("cubet-readingmask");
            div1.style.setProperty("height", e.y + "px", "important");
            let div2 = document.getElementById("cubet-readingmask2");
            div2.style.setProperty(
              "height",
              window.innerHeight - e.y - 100 + "px",
              "important"
            );
          } catch (err) {}
        });
      } else {
        try {
          let div = document.getElementById("cubet-readingmask");
          div?.remove();
          let div2 = document.getElementById("cubet-readingmask2");
          div2?.remove();
        } catch (er) {}
      }
    }
  }
  /*....................end of Reading Mask....................*/

  /*........................start of image descriptions.......................*/

  let imgDesc = document.getElementById("image-desc");
  imgDesc &&
    imgDesc.addEventListener("click", (event) => {
      imageDescriptions = !imageDescriptions;
      const object = {
        access_name: "image-desc",
        access_index: 0,
        isEnable: imageDescriptions,
        index: 18,
        property: {
          style: "visibility",
          value: ["hidden", "visible"],
        },
      };

      setLocalStorage("image-desc", object);
      setImageDesc(object);
    });

  function setImageDesc(image) {
    imageDescriptions = image?.isEnable;
    if (image) {
      if (image.isEnable)
        document.getElementById(image.access_name).classList.add("active");
      else
        document.getElementById(image.access_name).classList.remove("active");

      if (image.isEnable) {
        const imgs = document.querySelectorAll("img,image,picture");
        let elm = document.createElement("footer");
        elm.id = "cubet-tooltip";
        let currentElm = document.querySelector("body");
        currentElm?.insertBefore(elm, currentElm.children[0]);
        let div = document.getElementById("cubet-tooltip");
        div.classList.add("cubet-text-magnifier");
        imgs.forEach((img) => {
          const alt = img.getAttribute("alt");
          img.addEventListener("mouseenter", function (e) {
            if (alt) div.style.visibility = "visible";
            div.innerText = alt;
            try {
              let div1 = document.getElementById("cubet-tooltip");
              div1.style.setProperty("left", e.pageX - 0 + "px", "important");
              div1.style.setProperty("top", e.pageY - 0 + "px", "important");
            } catch (err) {}
          });
          img.addEventListener("mouseleave", function (leave) {
            div.style.cursor = "default";
            div.style.setProperty("visibility", "hidden", "important");
          });
        });
      } else {
        let div = document.getElementById("cubet-tooltip");
        div?.remove();
      }
    }
  }
  /*....................end of image descriptions....................*/

  /*........................start of auto scroll.......................*/

  let scrollLabel = document.getElementById("autoScrollLabel");
  let scroll = document.getElementById("autoScroll");
  scroll &&
    scroll.addEventListener("input", (event) => {
      autoScroll = !autoScroll;
      const object = {
        access_name: "auto-scroll",
        access_index: 0,
        isEnable: autoScroll,
        index: 12,
        property: {
          style: "zoom",
          value: getAbsNum(event.target.value),
          scroll: event.target.value,
        },
      };

      setLocalStorage("auto-scroll", object);
      setAutoScroll(object);
    });

  function setAutoScroll(autoScroll) {
    if (autoScroll) {
      scroll.value = autoScroll?.property?.scroll; // set the autoscroll Value
      scrollLabel.textContent =
        autoScroll != null ? setScrollValue(autoScroll.property.scroll) : 0;
      let value = autoScroll?.property.scroll;
      stopScroll();
      // function ClearAllIntervals() {

      // }
      function stopScroll() {
        for (var i = 1; i < 99999; i++) window.clearInterval(i);
      }
      var scrollerID;
      if (value > 0) {
        //up scrolling
        let speed = 0; // 1 - Fast | 2 - Medium | 3 - Slow
        speed = autoScroll?.property.value;
        let interval = speed * 35;
        function startScroll() {
          let id = setInterval(function () {
            var y1 = window.scrollY;
            y1 = y1 - 1;
            window.scrollTo(0, y1);
            // if (y1 < 0) {
            //   // Reached end of page
            //   stopScroll();
            // }
          }, interval);
          return id;
        }
        scrollerID = startScroll();
      } else if (value < 0) {
        //down scrolling
        let speed = autoScroll?.property.value; // 1 - Fast | 2 - Medium | 3 - Slow
        let interval = speed * 35;
        function startScroll() {
          let id = setInterval(function () {
            window.scrollBy(0, 1);
            // if (
            //   window.innerHeight + window.scrollY >=
            //   document.body.offsetHeight
            // ) {
            //   // Reached end of page
            //   stopScroll();
            // }
          }, interval);
          return id;
        }

        scrollerID = startScroll();
      } else if (value === 0) {
        stopScroll();
      }

      addEventListener("dblclick", (event) => {
        stopScroll();
      });
    }
  }

  function setScrollValue(value) {
    return value == 0
      ? "No Scroll"
      : value == 1
      ? "Up Slow"
      : value == 2
      ? "Up Medium"
      : value == 3
      ? "Up Fast"
      : value == -1
      ? "Down Slow"
      : value == -2
      ? "Down Medium"
      : "Down Fast";
  }

  function getAbsNum(value) {
    let absValue = Math.abs(value);
    let values =
      absValue === 1 ? 3 : absValue === 2 ? 2 : absValue === 3 ? 1 : 0;
    return values;
  }
  /*....................end of auto scroll....................*/

  //big-white cursor and big black cursor ----------------------------------------->
  let cursorButton = document.querySelectorAll(".big-cursor");

  cursorButton &&
    cursorButton.forEach((crs) => {
      crs.addEventListener("click", (e) => {
        let button = e.currentTarget;
        cursorButton.forEach((btn) => {
          btn !== button && btn.classList.remove("active");
        });

        button.classList.toggle("active");
        bigCursorBtn = button.classList.contains("active");
        const splitId = button.getAttribute("id").split("-");
        const object = {
          access_name: "big-cursor",
          access_index: button.getAttribute("id"),
          isEnable: bigCursorBtn,
          index: 11,
          property: {
            style: "big-cursor",
            value: splitId[1], // for getting the property name
          },
        };
        setLocalStorage("big-cursor", object);
        setBigCursor(object);
        // textAlignBtn=!textAlignBtn
      });
    });

  function setBigCursor(bigCursorArg) {
    bigCursorBtn = bigCursorArg?.isEnable;
    if (bigCursorArg) {
      if (!bigCursorArg?.isEnable) {
        document
          .getElementById(bigCursorArg.access_index)
          .classList.remove("active");
      } else {
        document
          .getElementById(bigCursorArg.access_index)
          .classList.add("active");
      }
    }
    var section = document.querySelectorAll("a,input,textarea,select,button");
    for (let sections of section) {
      sections.style.setProperty(
        "cursor",
        bigCursorArg?.isEnable
          ? bigCursorArg.property.value === "white"
            ? `url(${cursorPointer.whiteCursor.pointerUrl}),default`
            : `url(${cursorPointer.blackCursor.pointerUrl}),default`
          : "",
        "important" // cursor black or white pinter
      );
    }
    document.documentElement.style.cursor = bigCursorArg?.isEnable
      ? bigCursorArg.property.value === "white"
        ? `url(${cursorPointer.whiteCursor.cursorUrl}), default`
        : `url(${cursorPointer.blackCursor.cursorUrl}), default`
      : "";
  }

  //big-white cursor and big black cursor ----------------------------------------->

  /*........................start of text magnifier.......................*/

  let txtMag = document.getElementById("text-magnifier");
  txtMag &&
    txtMag.addEventListener("click", (event) => {
      textMagnifier = !textMagnifier;
      const object = {
        access_name: "text-magnifier",
        access_index: 0,
        isEnable: textMagnifier,
        index: 18,
        property: {
          style: "visibility",
          value: ["hidden", "visible"],
        },
      };

      setLocalStorage("text-magnifier", object);
      setTextMagnifier(object);
    });

  function setTextMagnifier(magnifier) {
    textMagnifier = magnifier?.isEnable;
    if (magnifier) {
      if (magnifier.isEnable)
        document.getElementById(magnifier.access_name).classList.add("active");
      else
        document
          .getElementById(magnifier.access_name)
          .classList.remove("active");

      try {
        let tags = document.querySelectorAll(
          "span,div,li,ui,p,table,tr,td,a,h1,h2,h3,h4,h5,h6"
        );
        let mag = document.getElementById("cubet-magnifier");
        if (magnifier.isEnable) {
          if (!mag) {
            let elm = document.createElement("footer");
            elm.id = "cubet-magnifier";
            let body = document.querySelector("body");
            body?.insertBefore(elm, body.children[0]);
            elm.classList.add("cubet-text-magnifier");
          }
          tags.forEach((tag) => {
            tag.addEventListener("mouseover", (e) => {
              try {
                let div1 = document.getElementById("cubet-magnifier");
                if (
                  ![undefined, null, "", " "].includes(e?.target?.innerText)
                ) {
                  div1.innerText = e?.target?.innerText;
                  div1?.style.setProperty(
                    magnifier.property.style,
                    magnifier.property.value[1],
                    "important"
                  );
                  div1.style.setProperty("left", e.pageX + "px", "important");
                  div1.style.setProperty("top", e.pageY + "px", "important");
                } else {
                  div1?.style.setProperty(
                    magnifier.property.style,
                    magnifier.property.value[0],
                    "important"
                  );
                }
              } catch (err) {}
            });
          });
        } else {
          try {
            mag?.remove();
          } catch (err) {}
        }
      } catch (err) {}
    }
  }
  /*....................end of text magnifier....................*/

  /*.............start of highlights title................... */

  let txtHigh = document.getElementById("titleHighlights");
  txtHigh &&
    txtHigh.addEventListener("click", (event) => {
      titleHighlight = !titleHighlight;
      const object = {
        access_name: "titleHighlights",
        access_index: 0,
        isEnable: titleHighlight,
        index: 11,
        property: {
          style: "outline",
          value: "#f00 solid 2px",
        },
      };

      setLocalStorage("titleHighlights", object);
      titleHighlights(object);
    });

  function titleHighlights(titlehighlight) {
    titleHighlight = titlehighlight?.isEnable;
    if (titlehighlight) {
      if (titlehighlight.isEnable)
        document
          .getElementById(titlehighlight.access_name)
          .classList.add("active");
      else
        document
          .getElementById(titlehighlight.access_name)
          ?.classList.remove("active");

      var section = document.body.querySelectorAll("h1,h2,h3,h4,h5,h6");
      for (let sections of section) {
        sections.style.setProperty(
          "outline",
          titlehighlight.isEnable ? "#f00 solid 2px" : "",
          "important"
        );
      }
    }
  }

  /*..................end of highlight title................... */

  /*.............start of highlights para................... */
  let highPara = document.getElementById("highlight-para");
  highPara &&
    highPara.addEventListener("click", (event) => {
      paraHighlight = !paraHighlight;
      const object = {
        access_name: "highlight-para",
        access_index: 0,
        isEnable: paraHighlight,
        index: 11,
        property: {
          style: "outline",
          value: "#f00 solid 2px",
        },
      };
      setLocalStorage("highlight-para", object);
      setParaHighlights(object);
    });

  function setParaHighlights(highlight) {
    paraHighlight = highlight?.isEnable;
    if (highlight) {
      if (highlight.isEnable)
        document.getElementById(highlight.access_name).classList.add("active");
      else
        document
          .getElementById(highlight.access_name)
          .classList.remove("active");

      var section = document.body.querySelectorAll("p");
      for (let sections of section) {
        sections.style.setProperty(
          "outline",
          highlight.isEnable ? "#f00 solid 2px" : "",
          "important"
        );
      }
    }
  }

  /*..................end of highlight para................... */

  /*.............start of Paragraph Width................... */
  let paraWidthElm = document.getElementById("para-width");

  paraWidthElm &&
    paraWidthElm.addEventListener("click", (event) => {
      paraWidth = !paraWidth;
      const object = {
        access_name: "para-width",
        access_index: 0,
        isEnable: paraWidth,
        index: 11,
        property: {
          style: "outline",
          value: "#f00 solid 2px",
        },
      };

      setLocalStorage("para-width", object);
      setParaWidth(object);
    });

  function setParaWidth(paraWidths) {
    paraWidth = paraWidths?.isEnable;
    if (paraWidths) {
      if (paraWidths.isEnable)
        document.getElementById(paraWidths.access_name).classList.add("active");
      else
        document
          .getElementById(paraWidths.access_name)
          .classList.remove("active");

      try {
        let tags = document.querySelectorAll(
          "span,div,li,ui,p,table,tr,td,a,h1,h2,h3,h4,h5,h6"
        );
        let mag = document.getElementById("cubet-para-width");
        if (paraWidths.isEnable) {
          if (!mag) {
            let elm = document.createElement("footer");
            elm.id = "cubet-para-width";
            let body = document.querySelector("body");
            body?.insertBefore(elm, body.children[0]);
            elm.classList.add("cubet-para-width");
          }
          tags.forEach((tag) => {
            tag.addEventListener("mouseup", (e) => {
              setTimeout(() => {
                try {
                  let div1 = document.getElementById("cubet-para-width");
                  const values = window.getSelection().toString();
                  if (![undefined, null, "", " "].includes(values)) {
                    var sentences = values.replace(
                      /\.(?!\d)|([^\d])\.(?=\d)/g,
                      "$1.\n"
                    );

                    div1.innerText = sentences;
                    div1?.style.setProperty(
                      "visibility",
                      "visible",
                      "important"
                    );

                    if (window.innerWidth / 2 - 30 < e.screenX) {
                      div1.style.setProperty("left", 60 + "px", "important");
                    } else {
                      div1.style.setProperty("left", 650 + "px", "important");
                    }

                    div1.style.setProperty(
                      "top",
                      e.pageY - 70 + "px",
                      "important"
                    );
                  } else {
                    div1?.style.setProperty(
                      "visibility",
                      "hidden",
                      "important"
                    );
                  }
                } catch (err) {}
              }, 500);
            });
          });
        } else {
          try {
            mag?.remove();
          } catch (err) {}
        }
      } catch (err) {}
    }
  }

  /*..................end of Paragraph Width.................. */

  /*.................... start of text to speak */
  // var lastClickedTag = "";
  // document.getElementById("textToSpeak").addEventListener("click", (event) => {
  //   textToSpeaks = !textToSpeaks;
  //   if (textToSpeaks) {
  //     if (!document.getElementById("speakBar")) {
  //       let div = document.createElement("div");
  //       div.id = "speakBar";
  //       div.classList.add("speakBar");
  //       document.body.appendChild(div);

  //       let btn1 = document.createElement("img");
  //       btn1.src = ${baseUrl}assets/images/pause.svg;
  //       btn1.id = "cubetPause";
  //       btn1.width = "25";
  //       btn1.title = "Pause";

  //       let btn2 = document.createElement("img");
  //       btn2.src = ${baseUrl}assets/images/resume.svg;
  //       btn2.id = "cubetResume";
  //       btn2.width = "25";
  //       btn2.title = "Resume";

  //       document.getElementById("speakBar").appendChild(btn1);
  //       document.getElementById("speakBar").appendChild(btn2);
  //     }

  //     setTextToSpeak(event);
  //   } else {
  //     document.getElementById("speakBar")?.remove();
  //   }
  // });

  // function setTextToSpeak(event) {
  //   let tags = document.body.querySelectorAll("span,div,p,h1,h2,h3,h4,h5,h6");
  //   tags.forEach((tag) => {
  //     tag.addEventListener("mouseup", (e) => {
  //       e.stopPropagation();
  //       const values = window.getSelection().toString();
  //       console.log(values, e);
  //       if (values != "") speaktext(values, e);
  //     });
  //   });
  // }

  // function speaktext(values, e) {
  //   if ("speechSynthesis" in window) {
  //     if (voices.length <= 0) {
  //       voices = speechSynthesis.getVoices();
  //     }

  //     if ("speechSynthesis" in window) {
  //       msg = new SpeechSynthesisUtterance(values);
  //       msg.volume = 1;
  //       msg.rate = 0.8;
  //       msg.voice = voices[1];
  //       msg.lang = "en-US";
  //       msg.pitch = 1;

  //       //Speak error
  //       msg.onerror = (e) => {
  //         console.log("Something went wrong!");
  //       };

  //       if (e.target.id == "cubetPause") {
  //         speechSynthesis.pause();
  //       }
  //       if (e.target.id == "cubetResume") {
  //         speechSynthesis.resume();
  //       }
  //       if (speechSynthesis.speaking) {
  //         speechSynthesis.cancel();
  //         speechSynthesis.speak(msg);
  //       } else {
  //         // setTimeout(() => {
  //           speechSynthesis.cancel();
  //           speechSynthesis.speak(msg);
  //         // }, 1500);
  //       }
  //     }
  //   }
  // }

  /*.................... end of text to speak */

  //set data in loacl storage
  function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  //refreshing the page and load cached filters
  // window.onload = function () {

  // };

  //function for closing the main popup
  function closeMainPopup() {
    document.getElementById("pluginOuter").style.display = "none";
    document.getElementById("iconMenu").style.display = "block";
  }

  function resetFilters(type) {
    if (type == "reset") {
      removeLocalItem("content-scaling");
      removeLocalItem("contrast");
      removeLocalItem("color");
      removeLocalItem("titleHighlights");

      removeLocalItem("background-color");
      removeLocalItem("highlight-links");
      removeLocalItem("readable-fonts");
      removeLocalItem("fontSize");
      removeLocalItem("line-height");
      removeLocalItem("read-mode");
      removeLocalItem("hide-image");
      removeLocalItem("reading-guide");
      removeLocalItem("reading-mask");
      removeLocalItem("image-desc");
      removeLocalItem("tint");
      removeLocalItem("text-magnifier");
      removeLocalItem("big-cursor");
      removeLocalItem("highlight-para");
      removeLocalItem("para-width");
      removeLocalItem("word-spacing");
      removeLocalItem("auto-scroll");
      removeLocalItem("text-align");
      removeLocalItem("letter-spacing");
      location.reload();
    } else {
      if (localStorage.length > 0) {
        // if (localStorage.getItem("contrast")) {
        //   console.log(localStorage.getItem("contrast"))

        // }
        setContrast(getLocalStorageItem("contrast"), type);
        setFontColor(getLocalStorageItem("color"), type);
        setBakColor(getLocalStorageItem("background-color"), type);
        titleHighlights(getLocalStorageItem("titleHighlights"));
        setContentScalingFun(getLocalStorageItem("content-scaling"));
        setHighlightLinks(getLocalStorageItem("highlight-links"));
        setReadableFont(getLocalStorageItem("readable-fonts"));

        setTextAlign(getLocalStorageItem("text-align"));

        setFontsize(getLocalStorageItem("fontSize"));

        setLineHeight(getLocalStorageItem("line-height"));
        setReadaMode(getLocalStorageItem("read-mode"));
        setHideImages(getLocalStorageItem("hide-image"));
        setReadingGuide(getLocalStorageItem("reading-guide"));
        setReadingMask(getLocalStorageItem("reading-mask"));
        setImageDesc(getLocalStorageItem("image-desc"));
        setTintColor(getLocalStorageItem("tint"), type);
        setTextMagnifier(getLocalStorageItem("text-magnifier"));
        setBigCursor(getLocalStorageItem("big-cursor"));
        setParaHighlights(getLocalStorageItem("highlight-para"));
        setParaWidth(getLocalStorageItem("para-width"));
        setWordSpacing(getLocalStorageItem("word-spacing"));
        // if (localStorage.getItem("color")) {

        // }
        // if (localStorage.getItem("background-color")) {

        // }

        // if (localStorage.getItem("titleHighlights")) {

        // }if(localStorage.getItem("content-scaling")){

        // }
      } else {
        // contentScaleText.textContent = 0; // set the conten text to zero
      }
    }
  }

  function removeLocalItem(item) {
    localStorage.removeItem(item);
  }

  function getLocalStorageItem(value) {
    return JSON.parse(localStorage.getItem(value));
  }

  //Closing the popup once click outside
  window.addEventListener("click", function (e) {
    if (!document.getElementById("cubet-plugin").contains(e.target)) {
      closeMainPopup();
    }
  });
  document.getElementById("iconMenu").addEventListener("click", (event) => {
    document.getElementById("pluginOuter").style.display = "block";
    document.getElementById("iconMenu").style.display = "none";
  });
  document.getElementById("closeIcon").addEventListener("click", (event) => {
    closeMainPopup();
  });
  document.getElementById("reset").addEventListener("click", (event) => {
    resetFilters("reset");
  });

  // window.onload = function () {
  //   onLoadWindow();
  // };

  function getDarkContrastHTML() {
    return ` <div class="col-4 my-2" >
  <a  class="box-type"  id="DarkContrast">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/Dark-Contrast.svg alt="Dark Contrast">
      </div>
      <p style="pointer-events: none;">Dark Contrast</p>
  </a>
</div>`;
  }

  function getHighContrastHTML() {
    return `<div class="col-4 my-2" >
  <a  class="box-type" id="HighContrast">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/high-contrast.svg alt="High Contrast">
      </div>
      <p style="pointer-events: none;">High Contrast</p>
  </a>
</div>`;
  }

  function getLowContrastHTML() {
    return `<div class="col-4 my-2" >
  <a  class="box-type" id="LowContrast">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/low-contrast.svg alt="Low Contrast">
      </div>
      <p style="pointer-events: none;">Low Contrast</p>
  </a>
</div>`;
  }

  function getHighSaturationHTML() {
    return ` <div class="col-4 my-2" >
<a  class="box-type " id="HighSaturation">
    <div class="icon">
       <img id="cubet-image"src=${baseUrl}assets/images/Hight-saturation.svg alt="High Saturation">
    </div>
    <p style="pointer-events: none;">High Saturation </p>
</a>
</div>`;
  }

  function getFontColorHTML() {
    return `  
    <div class="col-8 my-2">
    <div  class="box-type adjustcolor" id="textColor">
  <span class="color-text">Text Colors</span>
  <div class="colors">
     <a  id="c1" title="blue"  class="color-round color-1" >&hairsp;</a>
     <a  id="c2" title="Purple" class="color-round color-2">&hairsp;</a>
     <a  id="c3" title="Red" class="color-round color-3">&hairsp;</a>
     <a  id="c4" title="Orange"class="color-round color-4">&hairsp;</a>
     <a  id="c5" title="Teal" class="color-round color-5">&hairsp;</a>
     <a  id="c6" title="Green" class="color-round color-6">&hairsp;</a>
     <a  id="c7" title="White" class="color-round color-7">&hairsp;</a>
     <a  id="c8" title="Black" class="color-round color-8">&hairsp;</a>
  </div>
  <a id="cancelColor" class="cancel">Cancel</a>
</div>
</div>`;
  }

  function getLowSaturationHTML() {
    return `       <div class="col-4 my-2" >
  <a  class="box-type" id="LowSaturation">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/Low-Saturation.svg alt="Low Saturation">
      </div>
      <p>Low Saturation </p>
  </a>
</div>`;
  }
  function getBackGroundColorHTML() {
    return `  
      <div class="col-8 my-2">
      <div  class="box-type adjustcolor">
      <span class="color-text">Background Colors</span>
      <div class="colors">
         <a id="b1" title="blue"   class="color-round color-1">&hairsp;</a>
         <a id="b2" title="Purple" class="color-round color-2">&hairsp;</a>
         <a id="b3" title="Red" class="color-round color-3">&hairsp;</a>
         <a id="b4" title="Orange" class="color-round color-4">&hairsp;</a>
         <a id="b5" title="Teal" class="color-round color-5">&hairsp;</a>
         <a id="b6"  title="Green" class="color-round color-6">&hairsp;</a>
         <a id="b7" title="White" class="color-round color-7">&hairsp;</a>
         <a id="b8" title="Black" class="color-round color-8">&hairsp;</a>
      </div>
      <a id="cancelBakColor" class="cancel">Cancel</a>
    </div>
    </div>`;
  }
  function getTintColorHTML() {
    return `
    <div class="col-8 my-2">
    <div  class="box-type adjustcolor">
  <span class="color-text">Overlays and Tints</span>
  <div class="colors">
  <a id="t1" title="blue" class="color-round color-1">&hairsp;</a>
  <a id="t2" title="Purple" class="color-round color-2">&hairsp;</a>
  <a id="t3" title="Red" class="color-round color-3">&hairsp;</a>
  <a id="t4" title="Orange" class="color-round color-4">&hairsp;</a>
  <a id="t5" title="Teal" class="color-round color-5">&hairsp;</a>
  <a id="t6" title="Green" class="color-round color-6">&hairsp;</a>
  <a id="t9" title="Yellow" class="color-round color-9">&hairsp;</a>
  <a id="t10" title="Pink" class="color-round color-10">&hairsp;</a>
  </div>
  <a  id="cancelTint" class="cancel">Cancel</a>
</div>
</div>`;
  }

  function getHighLightsTitleHTML() {
    if (
      config.highTitle ||
      [undefined, null, "", " "].includes(config.highTitle)
    ) {
      return `  <div class="col-4 my-2" >
      <a  id="titleHighlights" class="box-type">
          <div class="icon">
             <img id="cubet-image"src=${baseUrl}assets/images/text-highlight.svg alt="Highlight Titles">
          </div>
          <p style="pointer-events: none;">Highlight Titles</p>
      </a>
    </div>`;
    } else {
      return "";
    }
  }

  function getHightLightLinksHTML() {
    return `<div class="col-4 my-2">
  <a  class="box-type" id="highlight-links">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/link-highlight.svg alt="Highlight Links">
      </div>
      <p style="pointer-events: none;">Highlight Links</p>
  </a>
</div>`;
  }
  function getMonoChromeHTML() {
    return `<div class="col-4 my-2" >
  <a class="box-type" id="MonoChrome">
  <div class="icon">
  <img id="cubet-image"src=${baseUrl}assets/images/Monochrome.svg alt="Monochrome">
  </div>
  <p style="pointer-events: none;">Monochrome </p>
  </a>
  </div>`;
  }
  function getReadableFontHTML() {
    return `    <div class="col-4 my-2">
  <a  class="box-type" id="readable-fonts">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/readable-fonts.svg alt="Readable Fonts">
      </div>
      <p>Readable Fonts</p>
  </a>
</div>`;
  }

  function getContentScaleHTML() {
    return `<div class="col-8 my-2">
  <div  class="box-type adjustcolor">
      <span class="color-text mb-2">Content Scaling</span>
      <div class="slidecontainer slider-shadow">
          <input type="range" min="-3" max="3" value="0" class="range-slider" id="contentScaling">
      </div>
      <h6  class="text-center fw-bold"><output id="contentScalingLabel">0</output></h6>
  </div>
</div>`;
  }

  function getAlighLeftHTML() {
    return ` <div class="col-4 my-2">
  <a id="align-left" class="box-type textAlign">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/align-left.svg alt="Align Left ">
      </div>
      <p>Align Left </p>
  </a>
</div>`;
  }
  function getFontSizeHTML() {
    return `  <div class="col-8 my-2">
  <div id="fontSize"  class="box-type adjustcolor">
      <span class="color-text mb-2">Font Size</span>
      <div class="slidecontainer">
          <input type="range" min="-3" max="3" value="0" class="range-slider" id="fontsizeScaling">
      </div>
      <h6 class="text-center fw-bold"><output id="fontsizeScalingLabel">0</output></h6>
  </div>
</div>`;
  }
  function getTextCenterHTML() {
    return `    <div class="col-4 my-2">
  <a  id="align-center" class="box-type textAlign">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/align-center.svg alt="Align Center">
      </div>
      <p>Align Center </p>
  </a>
</div>
`;
  }
  function getLineHeightHTML() {
    return `   <div class="col-8 my-2">
  <div  id="lineHeight" class="box-type adjustcolor">
      <span class="color-text mb-2">Line Height</span>
      <div class="slidecontainer">
          <input type="range" min="-3" max="3" value="0" class="range-slider" id="lineHeightScaling">
      </div>
      <h6 class="text-center fw-bold"><output id="lineHeightScalingLabel">0</output></h6>
  </div>
</div>`;
  }
  function getTextAlighRightHTML() {
    return `<div class="col-4 my-2">
  <a  id="align-right" class="box-type textAlign">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/align-right.svg alt="Align Right ">
      </div>
      <p>Align Right </p>
  </a>
</div>`;
  }
  function getAdjustLetterSpacingHTML() {
    return `    <div class="col-8 my-2">
  <div id="letterSpacing"  class="box-type adjustcolor">
      <span class="color-text mb-2">Letter Spacing</span>
      <div class="slidecontainer">
          <input type="range" min="-3" max="3" value="0" class="range-slider" id="letterSpacingScaling">
      </div>
      <h6 class="text-center fw-bold"><output id="letterSpacingScalingLabel">0</output></h6>
  </div>
</div>`;
  }

  function getBigBlackCursorHTML() {
    return `  <div class="row gx-3">
  <div class="col-4 my-2">
  <a id="big-black-cursor"  class="box-type big-cursor">
  <div class="icon">
     <img id="cubet-image"src=${baseUrl}assets/images/cursor-dark.svg alt="Big Black Cursor">
  </div>
  <p>Big Black Cursor</p>
</a>
  </div>`;
  }

  function getBigWhiteCursorHTML() {
    return `  <div class="col-4 my-2">
  <a id="big-white-cursor" class="box-type big-cursor">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/cursor-white.svg alt="Big White Cursor">
      </div>
      <p>Big White Cursor</p>
  </a>
</div>`;
  }

  function getReaderModeHTML() {
    return `  <div class="col-4 my-2">
  <a id="read-mode" class="box-type">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/readMode.svg alt="Reader Mode">
      </div>
      <p>Reader Mode</p>
  </a>
</div>`;
  }

  function getHideImageHTML() {
    return `  <div class="col-4 my-2">
  <a  class="box-type" id="hide-image">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/no-image.svg alt="Hide Images">
      </div>
      <p>Hide Images</p>
  </a>
</div>`;
  }

  function getHReadingGuideHTML() {
    return `  <div class="col-4 my-2">
  <a  class="box-type" id="reading-guide">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/reader-guid.svg alt="Reading Guide">
      </div>
      <p>Reading Guide</p>
  </a>
</div>`;
  }

  function getImageDescriptionHTML() {
    return `  <div class="col-4 my-2">
  <a  class="box-type" id="image-desc">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/altimage.svg alt="Image Description">
      </div>
      <p>Image Description</p>
  </a>
</div>`;
  }

  function getReadingMaskHTML() {
    return `  <div class="col-4 my-2">
  <a  class="box-type" id="reading-mask">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/read.svg alt="Reading Mask">
      </div>
      <p>Reading Mask</p>
  </a>
</div>`;
  }

  function getAutoScrollHTML() {
    return `  <div class="col-8 my-2">
  <div id="fontSize"  class="box-type adjustcolor">
      <span class="color-text mb-2">Auto Scroll</span>
      <div class="slidecontainer">
          <input type="range" min="-3" max="3" value="0" class="range-slider" id="autoScroll">
      </div>
      <h6 class="text-center fw-bold"><output id="autoScrollLabel">No Scroll</output></h6>
  </div>
</div>`;
  }

  function getTextMagnifierHTML() {
    return `  <div class="col-4 my-2">
  <a  class="box-type" id="text-magnifier">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/magnifier.svg alt="Text Magnifier">
      </div>
      <p>Text Magnifier</p>
  </a>
</div>`;
  }

  function getHighlightsParaHTML() {
    return `  <div class="col-4 my-2">
  <a  class="box-type" id="highlight-para">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/paragraphs.svg alt="Highlight Paragraphs">
      </div>
      <p>Highlight Paragraphs</p>
  </a>
</div>`;
  }

  function getParaWidthHTML() {
    return `  <div class="col-4 my-2">
  <a  class="box-type" id="para-width">
      <div class="icon">
         <img id="cubet-image"src=${baseUrl}assets/images/parawidth.svg alt="Paragraph Width">
      </div>
      <p>Paragraph Width</p>
  </a>
</div>`;
  }

  function getWordSpacingHTML() {
    return `<div class="col-8 my-2">
  <div  class="box-type adjustcolor">
      <span class="color-text mb-2">Word Spacing</span>
      <div class="slidecontainer">
          <input type="range" min="-3" max="3" value="0" class="range-slider" id="wordSpacing">
      </div>
      <h6  class="text-center fw-bold"><output id="wordSpaceText">0</output></h6>
  </div>
</div>`;
  }

  //   function getTextToSpeakHTML() {
  //     return `  <div class="col-4 my-2">
  //   <a  class="box-type" id="textToSpeak">
  //       <div class="icon">
  //          <img id="cubet-image"src=${baseUrl}assets/images/parawidth.svg alt="Highlight Paragraphs">
  //       </div>
  //       <p>Text To Speak</p>
  //   </a>
  // </div>`;
  //   }
  document.getElementById("leftArrow").addEventListener("click", function () {
    leftArrow();
  });

  document.getElementById("rightArrow").addEventListener("click", function () {
    rightArrow();
  });
}

function leftArrow() {
  document.getElementById("leftArrow").style.visibility = "hidden";
  document.getElementById("leftArrow").style.display = "none";
  document.getElementById("rightArrow").style.visibility = "visible";
  document.getElementById("rightArrow").style.display = "";
  document.getElementById("pluginOuter").style.removeProperty("right");
  document.getElementById("pluginOuter").style.left = 0;
}

function rightArrow() {
  document.getElementById("leftArrow").style.visibility = "visible";
  document.getElementById("leftArrow").style.display = "";
  document.getElementById("rightArrow").style.visibility = "hidden";
  document.getElementById("rightArrow").style.display = "none";
  document.getElementById("pluginOuter").style.removeProperty("left");
  document.getElementById("pluginOuter").style.right = 0;
}

function positionDiv(align) {
  if (align === "right") {
    document.getElementById("menuStart").style.left = 0;
    leftArrow();
  } else {
    document.getElementById("menuStart").style.right = 0;
    rightArrow();
  }
}

// speechSynthesis.addEventListener("voiceschanged", () => {
//   voices = speechSynthesis.getVoices();
// });
document.getElementById("cubetPause")?.addEventListener("click", function () {
  // document.getElementById("pause").innerText = "pause";
  speechSynthesis.pause();
});

document.getElementById("cubetResume")?.addEventListener("click", function () {
  // document.getElementById("resume").innerText = "resume";
  speechSynthesis.resume();
});
function cubilityInit(params) {
  document
    .getElementsByTagName("head")[0]
    .insertAdjacentHTML(
      "beforeend",
      `<link type="text/css" rel="stylesheet" href=${baseUrl}css/cubet-style.css />`
    );
  let config = {
    backgroundColor: params.color,
    position: params.position,
    image: params.image,

    getBackGroundColorHTML: params.backgroundColor,
    getFontColorHTML: params.fontColor,
    getTintColorHTML: params.overlayAndTints,
    getTextMagnifierHTML: params.textMagnifier,
    getParaWidthHTML: params.paraGraphWidth,
    getReadableFontHTML: params.readableFont,
    getHighLightsTitleHTML: params.highlightTitles,
    getHightLightLinksHTML: params.highlightLinks,
    getHighlightsParaHTML: params.highlightParagraphs,
    getContentScaleHTML: params.contentScaling,
    getLineHeightHTML: params.lineHeight,
    getAdjustLetterSpacingHTML: params.letterSpacing,
    getWordSpacingHTML: params.wordSpacing,
    getFontSizeHTML: params.fontSize,

    getReaderModeHTML: params.readerMode,
    getHideImageHTML: params.hideImage,
    getImageDescriptionHTML: params.imageDescription,
    getReadingMaskHTML: params.readingMask,
    getAutoScrollHTML: params.autoScroll,
    getHReadingGuideHTML: params.readingGuideLine,
  }; // set the properties of the customized web site
  if (params.hasOwnProperty("contrast")) {
    config.getDarkContrastHTML = params.contrast;
    config.getLowContrastHTML = params.contrast;
    config.getHighContrastHTML = params.contrast;
    config.getHighSaturationHTML = params.contrast;
    config.getLowSaturationHTML = params.contrast;
    config.getMonoChromeHTML = params.contrast;
  }
  if (params.hasOwnProperty("cursor")) {
    config.getBigBlackCursorHTML = params.cursor;
    config.getBigWhiteCursorHTML = params.cursor;
  }
  if (params.hasOwnProperty("textAlign")) {
    config.getAlighLeftHTML = params.textAlign;
    config.getTextCenterHTML = params.textAlign;
    config.getTextAlighRightHTML = params.textAlign;
  }
  setTimeout(() => {
    onLoadWindow(config);
  }, 1000);
}
