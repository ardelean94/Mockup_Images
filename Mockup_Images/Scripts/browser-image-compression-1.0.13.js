﻿/**
 * Browser Image Compression
 * v1.0.13
 * by Donald <donaldcwl@gmail.com>
 * https://github.com/Donaldcwl/browser-image-compression
 */

!(function (e, r) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = r()) : "function" == typeof define && define.amd ? define(r) : ((e = e || self).imageCompression = r());
})(this, function () {
    "use strict";
    function _defineProperty(e, r, n) {
        return r in e ? Object.defineProperty(e, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[r] = n), e;
    }
    function ownKeys(e, r) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var t = Object.getOwnPropertySymbols(e);
            r &&
                (t = t.filter(function (r) {
                    return Object.getOwnPropertyDescriptor(e, r).enumerable;
                })),
                n.push.apply(n, t);
        }
        return n;
    }
    function _objectSpread2(e) {
        for (var r = 1; r < arguments.length; r++) {
            var n = null != arguments[r] ? arguments[r] : {};
            r % 2
                ? ownKeys(Object(n), !0).forEach(function (r) {
                    _defineProperty(e, r, n[r]);
                })
                : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                    : ownKeys(Object(n)).forEach(function (r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
                    });
        }
        return e;
    }
    function _slicedToArray(e, r) {
        return (
            (function _arrayWithHoles(e) {
                if (Array.isArray(e)) return e;
            })(e) ||
            (function _iterableToArrayLimit(e, r) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
                var n = [],
                    t = !0,
                    i = !1,
                    o = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(t = (a = s.next()).done) && (n.push(a.value), !r || n.length !== r); t = !0);
                } catch (e) {
                    (i = !0), (o = e);
                } finally {
                    try {
                        t || null == s.return || s.return();
                    } finally {
                        if (i) throw o;
                    }
                }
                return n;
            })(e, r) ||
            (function _unsupportedIterableToArray(e, r) {
                if (!e) return;
                if ("string" == typeof e) return _arrayLikeToArray(e, r);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(e, r);
            })(e, r) ||
            (function _nonIterableRest() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function _arrayLikeToArray(e, r) {
        (null == r || r > e.length) && (r = e.length);
        for (var n = 0, t = new Array(r); n < r; n++) t[n] = e[n];
        return t;
    }
    var e = "undefined" != typeof window,
        r = e && window.cordova && window.cordova.require && window.cordova.require("cordova/modulemapper"),
        CustomFile = e && ((r && r.getOriginalSymbol(window, "File")) || File),
        CustomFileReader = e && ((r && r.getOriginalSymbol(window, "FileReader")) || FileReader),
        n =
            e &&
            new Promise(function (e, r) {
                var n, t, i, o;
                return getFilefromDataUrl(
                    "data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==",
                    "test.jpg",
                    Date.now()
                ).then(function (a) {
                    try {
                        return drawFileInCanvas((n = a)).then(function (a) {
                            try {
                                return canvasToFile((t = a[1]), n.type, n.name, n.lastModified).then(function (n) {
                                    try {
                                        return (
                                            (i = n),
                                            cleanupCanvasMemory(t),
                                            getDataUrlFromFile(i).then(function (n) {
                                                try {
                                                    return loadImage(n).then(function (n) {
                                                        try {
                                                            return e(1 === (o = n).width && 2 === o.height);
                                                        } catch (e) {
                                                            return r(e);
                                                        }
                                                    }, r);
                                                } catch (e) {
                                                    return r(e);
                                                }
                                            }, r)
                                        );
                                    } catch (e) {
                                        return r(e);
                                    }
                                }, r);
                            } catch (e) {
                                return r(e);
                            }
                        }, r);
                    } catch (e) {
                        return r(e);
                    }
                }, r);
            });
    function getDataUrlFromFile(e) {
        return new Promise(function (r, n) {
            var t = new CustomFileReader();
            (t.onload = function () {
                return r(t.result);
            }),
                (t.onerror = function (e) {
                    return n(e);
                }),
                t.readAsDataURL(e);
        });
    }
    function getFilefromDataUrl(e, r) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Date.now();
        return new Promise(function (t) {
            for (var i = e.split(","), o = i[0].match(/:(.*?);/)[1], a = window.atob(i[1]), s = a.length, c = new Uint8Array(s); s--;) c[s] = a.charCodeAt(s);
            var u = new Blob([c], { type: o });
            (u.name = r), (u.lastModified = n), t(u);
        });
    }
    function loadImage(e) {
        return new Promise(function (r, n) {
            var t = new Image();
            (t.onload = function () {
                return r(t);
            }),
                (t.onerror = function (e) {
                    return n(e);
                }),
                (t.src = e);
        });
    }
    function drawImageInCanvas(e) {
        var r = _slicedToArray(getNewCanvasAndCtx(e.width, e.height), 2),
            n = r[0];
        return r[1].drawImage(e, 0, 0, n.width, n.height), n;
    }
    function drawFileInCanvas(e) {
        return new Promise(function (r, n) {
            var t,
                i,
                o = function $Try_1_Post() {
                    try {
                        return (i = drawImageInCanvas(t)), r([t, i]);
                    } catch (e) {
                        return n(e);
                    }
                },
                a = function $Try_1_Catch(r) {
                    try {
                        return getDataUrlFromFile(e).then(function (e) {
                            try {
                                return loadImage(e).then(function (e) {
                                    try {
                                        return (t = e), o();
                                    } catch (e) {
                                        return n(e);
                                    }
                                }, n);
                            } catch (e) {
                                return n(e);
                            }
                        }, n);
                    } catch (e) {
                        return n(e);
                    }
                };
            try {
                return createImageBitmap(e).then(function (e) {
                    try {
                        return (t = e), o();
                    } catch (e) {
                        return a();
                    }
                }, a);
            } catch (e) {
                a();
            }
        });
    }
    function canvasToFile(e, r, n, t) {
        var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1;
        return new Promise(function (o, a) {
            var s;
            return "function" == typeof OffscreenCanvas && e instanceof OffscreenCanvas
                ? e.convertToBlob({ type: r, quality: i }).then(
                    function (e) {
                        try {
                            return ((s = e).name = n), (s.lastModified = t), $If_4.call(this);
                        } catch (e) {
                            return a(e);
                        }
                    }.bind(this),
                    a
                )
                : getFilefromDataUrl(e.toDataURL(r, i), n, t).then(
                    function (e) {
                        try {
                            return (s = e), $If_4.call(this);
                        } catch (e) {
                            return a(e);
                        }
                    }.bind(this),
                    a
                );
            function $If_4() {
                return o(s);
            }
        });
    }
    function getExifOrientation(e) {
        return new Promise(function (r, n) {
            var t = new CustomFileReader();
            (t.onload = function (e) {
                var n = new DataView(e.target.result);
                if (65496 != n.getUint16(0, !1)) return r(-2);
                for (var t = n.byteLength, i = 2; i < t;) {
                    if (n.getUint16(i + 2, !1) <= 8) return r(-1);
                    var o = n.getUint16(i, !1);
                    if (((i += 2), 65505 == o)) {
                        if (1165519206 != n.getUint32((i += 2), !1)) return r(-1);
                        var a = 18761 == n.getUint16((i += 6), !1);
                        i += n.getUint32(i + 4, a);
                        var s = n.getUint16(i, a);
                        i += 2;
                        for (var c = 0; c < s; c++) if (274 == n.getUint16(i + 12 * c, a)) return r(n.getUint16(i + 12 * c + 8, a));
                    } else {
                        if (65280 != (65280 & o)) break;
                        i += n.getUint16(i, !1);
                    }
                }
                return r(-1);
            }),
                (t.onerror = function (e) {
                    return n(e);
                }),
                t.readAsArrayBuffer(e);
        });
    }
    function handleMaxWidthOrHeight(e, r) {
        var n,
            t = e.width,
            i = e.height,
            o = r.maxWidthOrHeight,
            a = e;
        if (isFinite(o) && (t > o || i > o)) {
            var s = _slicedToArray(getNewCanvasAndCtx(t, i), 2);
            (a = s[0]), (n = s[1]), t > i ? ((a.width = o), (a.height = (i / t) * o)) : ((a.width = (t / i) * o), (a.height = o)), n.drawImage(e, 0, 0, a.width, a.height), cleanupCanvasMemory(e);
        }
        return a;
    }
    function followExifOrientation(e, r) {
        var n = e.width,
            t = e.height,
            i = _slicedToArray(getNewCanvasAndCtx(n, t), 2),
            o = i[0],
            a = i[1];
        switch ((4 < r && r < 9 ? ((o.width = t), (o.height = n)) : ((o.width = n), (o.height = t)), r)) {
            case 2:
                a.transform(-1, 0, 0, 1, n, 0);
                break;
            case 3:
                a.transform(-1, 0, 0, -1, n, t);
                break;
            case 4:
                a.transform(1, 0, 0, -1, 0, t);
                break;
            case 5:
                a.transform(0, 1, 1, 0, 0, 0);
                break;
            case 6:
                a.transform(0, 1, -1, 0, t, 0);
                break;
            case 7:
                a.transform(0, -1, -1, 0, t, n);
                break;
            case 8:
                a.transform(0, -1, 1, 0, 0, n);
        }
        return a.drawImage(e, 0, 0, n, t), cleanupCanvasMemory(e), o;
    }
    function getNewCanvasAndCtx(e, r) {
        var n, t;
        try {
            if (null === (t = (n = new OffscreenCanvas(e, r)).getContext("2d"))) throw new Error("getContext of OffscreenCanvas returns null");
        } catch (e) {
            t = (n = document.createElement("canvas")).getContext("2d");
        }
        return (n.width = e), (n.height = r), [n, t];
    }
    function cleanupCanvasMemory(e) {
        (e.width = 0), (e.height = 0);
    }
    function compress(e, r) {
        return new Promise(function (t, i) {
            var o, a, s, c, u, l, f, m, g, A, d, p, h, y, v, w, C, E;
            function incProgress() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5;
                (o += e), r.onProgress(Math.min(o, 100));
            }
            function setProgress(e) {
                (o = Math.min(Math.max(e, o), 100)), r.onProgress(o);
            }
            return (
                (o = 0),
                (a = r.maxIteration || 10),
                (s = 1024 * r.maxSizeMB * 1024),
                incProgress(),
                drawFileInCanvas(e).then(
                    function (o) {
                        try {
                            var b = _slicedToArray(o, 2);
                            return (
                                b[0],
                                (c = b[1]),
                                incProgress(),
                                (u = handleMaxWidthOrHeight(c, r)),
                                incProgress(),
                                new Promise(function (n, t) {
                                    var i;
                                    if (!(i = r.exifOrientation))
                                        return getExifOrientation(e).then(
                                            function (e) {
                                                try {
                                                    return (i = e), $If_2.call(this);
                                                } catch (e) {
                                                    return t(e);
                                                }
                                            }.bind(this),
                                            t
                                        );
                                    function $If_2() {
                                        return n(i);
                                    }
                                    return $If_2.call(this);
                                }).then(
                                    function (o) {
                                        try {
                                            return (
                                                (l = o),
                                                incProgress(),
                                                n.then(
                                                    function (n) {
                                                        try {
                                                            return (
                                                                (f = n ? u : followExifOrientation(u, l)),
                                                                incProgress(),
                                                                (m = r.initialQuality || 1),
                                                                "image/jpeg",
                                                                (g = r.fileType || e.type),
                                                                canvasToFile(f, g, e.name, e.lastModified, m).then(
                                                                    function (r) {
                                                                        try {
                                                                            {
                                                                                if (((A = r), incProgress(), (d = A.size > s), (p = A.size > e.size), !d && !p)) return setProgress(100), t(A);
                                                                                var n;
                                                                                function $Loop_3() {
                                                                                    if (a-- && (v > s || v > h)) {
                                                                                        var r,
                                                                                            n,
                                                                                            t = _slicedToArray(getNewCanvasAndCtx((r = d ? 0.95 * E.width : E.width), (n = d ? 0.95 * E.height : E.height)), 2);
                                                                                        return (
                                                                                            (C = t[0]),
                                                                                            t[1].drawImage(E, 0, 0, r, n),
                                                                                            (m *= 0.95),
                                                                                            canvasToFile(C, "image/jpeg", e.name, e.lastModified, m).then(function (e) {
                                                                                                try {
                                                                                                    return (w = e), cleanupCanvasMemory(E), (E = C), (v = w.size), setProgress(Math.min(99, Math.floor(((y - v) / (y - s)) * 100))), $Loop_3;
                                                                                                } catch (e) {
                                                                                                    return i(e);
                                                                                                }
                                                                                            }, i)
                                                                                        );
                                                                                    }
                                                                                    return [1];
                                                                                }
                                                                                return (
                                                                                    (h = e.size),
                                                                                    (y = A.size),
                                                                                    (v = y),
                                                                                    (E = f),
                                                                                    (n = function (e) {
                                                                                        for (; e;) {
                                                                                            if (e.then) return void e.then(n, i);
                                                                                            try {
                                                                                                if (e.pop) {
                                                                                                    if (e.length) return e.pop() ? $Loop_3_exit.call(this) : e;
                                                                                                    e = $Loop_3;
                                                                                                } else e = e.call(this);
                                                                                            } catch (e) {
                                                                                                return i(e);
                                                                                            }
                                                                                        }
                                                                                    }.bind(this))($Loop_3)
                                                                                );
                                                                                function $Loop_3_exit() {
                                                                                    return (
                                                                                        "image/jpeg" !== g && (((w = new Blob([w], { type: g })).name = e.name), (w.lastModified = e.lastModified)),
                                                                                        cleanupCanvasMemory(E),
                                                                                        cleanupCanvasMemory(C),
                                                                                        cleanupCanvasMemory(u),
                                                                                        cleanupCanvasMemory(f),
                                                                                        cleanupCanvasMemory(c),
                                                                                        setProgress(100),
                                                                                        t(w)
                                                                                    );
                                                                                }
                                                                            }
                                                                        } catch (e) {
                                                                            return i(e);
                                                                        }
                                                                    }.bind(this),
                                                                    i
                                                                )
                                                            );
                                                        } catch (e) {
                                                            return i(e);
                                                        }
                                                    }.bind(this),
                                                    i
                                                )
                                            );
                                        } catch (e) {
                                            return i(e);
                                        }
                                    }.bind(this),
                                    i
                                )
                            );
                        } catch (e) {
                            return i(e);
                        }
                    }.bind(this),
                    i
                )
            );
        });
    }
    e &&
        (Number.isInteger =
            Number.isInteger ||
            function (e) {
                return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
            });
    var t,
        i,
        o = 0;
    function generateLib() {
        return (function createSourceObject(e) {
            return URL.createObjectURL(new Blob([e], { type: "application/javascript" }));
        })(
            "\n    function imageCompression (){return ("
                .concat(imageCompression, ").apply(null, arguments)}\n\n    imageCompression.getDataUrlFromFile = ")
                .concat(imageCompression.getDataUrlFromFile, "\n    imageCompression.getFilefromDataUrl = ")
                .concat(imageCompression.getFilefromDataUrl, "\n    imageCompression.loadImage = ")
                .concat(imageCompression.loadImage, "\n    imageCompression.drawImageInCanvas = ")
                .concat(imageCompression.drawImageInCanvas, "\n    imageCompression.drawFileInCanvas = ")
                .concat(imageCompression.drawFileInCanvas, "\n    imageCompression.canvasToFile = ")
                .concat(imageCompression.canvasToFile, "\n    imageCompression.getExifOrientation = ")
                .concat(imageCompression.getExifOrientation, "\n    imageCompression.handleMaxWidthOrHeight = ")
                .concat(imageCompression.handleMaxWidthOrHeight, "\n    imageCompression.followExifOrientation = ")
                .concat(imageCompression.followExifOrientation, "\n    imageCompression.cleanupMemory = ")
                .concat(
                    imageCompression.cleanupMemory,
                    "\n\n    getDataUrlFromFile = imageCompression.getDataUrlFromFile\n    getFilefromDataUrl = imageCompression.getFilefromDataUrl\n    loadImage = imageCompression.loadImage\n    drawImageInCanvas = imageCompression.drawImageInCanvas\n    drawFileInCanvas = imageCompression.drawFileInCanvas\n    canvasToFile = imageCompression.canvasToFile\n    getExifOrientation = imageCompression.getExifOrientation\n    handleMaxWidthOrHeight = imageCompression.handleMaxWidthOrHeight\n    followExifOrientation = imageCompression.followExifOrientation\n    cleanupMemory = imageCompression.cleanupMemory\n\n    getNewCanvasAndCtx = "
                )
                .concat(
                    getNewCanvasAndCtx,
                    "\n    \n    CustomFileReader = FileReader\n    \n    CustomFile = File\n    \n    function _slicedToArray(arr, n) { return arr }\n    \n    function _typeof(a) { return typeof a }\n\n    function compress (){return ("
                )
                .concat(compress, ").apply(null, arguments)}\n    ")
        );
    }
    function generateWorkerScript() {
        return (function createWorker(e) {
            return "function" == typeof e && (e = "(".concat(f, ")()")), new Worker(URL.createObjectURL(new Blob([e])));
        })(
            "\n    let scriptImported = false\n    self.addEventListener('message', async (e) => {\n      const { file, id, imageCompressionLibUrl, options } = e.data\n      options.onProgress = (progress) => self.postMessage({ progress, id })\n      try {\n        if (!scriptImported) {\n          // console.log('[worker] importScripts', imageCompressionLibUrl)\n          self.importScripts(imageCompressionLibUrl)\n          scriptImported = true\n        }\n        // console.log('[worker] self', self)\n        const compressedFile = await imageCompression(file, options)\n        self.postMessage({ file: compressedFile, id })\n      } catch (e) {\n        // console.error('[worker] error', e)\n        self.postMessage({ error: e.message + '\\n' + e.stack, id })\n      }\n    })\n  "
        );
    }
    function imageCompression(e, r) {
        return new Promise(function (n, a) {
            var s, c, u;
            if (
                ((r.maxSizeMB = r.maxSizeMB || Number.POSITIVE_INFINITY),
                    (c = "boolean" != typeof r.useWebWorker || r.useWebWorker),
                    delete r.useWebWorker,
                    void 0 === r.onProgress && (r.onProgress = function () { }),
                    !(e instanceof Blob || e instanceof CustomFile))
            )
                return a(new Error("The file given is not an instance of Blob or File"));
            if (!/^image/.test(e.type)) return a(new Error("The file given is not an image"));
            if (((u = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope), !c || "function" != typeof Worker || u))
                return compress(e, r).then(
                    function (e) {
                        try {
                            return (s = e), $If_3.call(this);
                        } catch (e) {
                            return a(e);
                        }
                    }.bind(this),
                    a
                );
            var l = function () {
                try {
                    return $If_3.call(this);
                } catch (e) {
                    return a(e);
                }
            }.bind(this),
                f = function $Try_1_Catch(n) {
                    try {
                        return compress(e, r).then(function (e) {
                            try {
                                return (s = e), l();
                            } catch (e) {
                                return a(e);
                            }
                        }, a);
                    } catch (e) {
                        return a(e);
                    }
                };
            try {
                return (function compressOnWebWorker(e, r) {
                    return new Promise(function (n, a) {
                        return new Promise(function (s, c) {
                            var u = o++;
                            return (
                                t || (t = generateLib()),
                                i || (i = generateWorkerScript()),
                                i.addEventListener("message", function handler(e) {
                                    if (e.data.id === u) {
                                        if (void 0 !== e.data.progress) return void r.onProgress(e.data.progress);
                                        i.removeEventListener("message", handler), e.data.error && a(new Error(e.data.error)), n(e.data.file);
                                    }
                                }),
                                i.addEventListener("error", a),
                                i.postMessage({ file: e, id: u, imageCompressionLibUrl: t, options: _objectSpread2(_objectSpread2({}, r), {}, { onProgress: void 0 }) }),
                                s()
                            );
                        });
                    });
                })(e, r).then(function (e) {
                    try {
                        return (s = e), l();
                    } catch (e) {
                        return f();
                    }
                }, f);
            } catch (e) {
                f();
            }
            function $If_3() {
                try {
                    (s.name = e.name), (s.lastModified = e.lastModified);
                } catch (e) { }
                return n(s);
            }
        });
    }
    return (
        (imageCompression.getDataUrlFromFile = getDataUrlFromFile),
        (imageCompression.getFilefromDataUrl = getFilefromDataUrl),
        (imageCompression.loadImage = loadImage),
        (imageCompression.drawImageInCanvas = drawImageInCanvas),
        (imageCompression.drawFileInCanvas = drawFileInCanvas),
        (imageCompression.canvasToFile = canvasToFile),
        (imageCompression.getExifOrientation = getExifOrientation),
        (imageCompression.handleMaxWidthOrHeight = handleMaxWidthOrHeight),
        (imageCompression.followExifOrientation = followExifOrientation),
        (imageCompression.cleanupMemory = cleanupCanvasMemory),
        (imageCompression.version = "1.0.13"),
        imageCompression
    );
});