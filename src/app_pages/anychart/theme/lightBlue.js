/**
 * AnyChart is lightweight robust charting library with great API and Docs, that works with your stack and has tons of chart types and features.
 *
 * Theme: lightBlue
 * Version: 2.0.0 (2019-04-26)
 * License: https://www.anychart.com/buy/
 * Contact: sales@anychart.com
 * Copyright: AnyChart.com 2019. All rights reserved.
 */
function a() {
    return window.anychart.color.setOpacity(this.sourceColor, 0.5, !0);
}
function b() {
    return window.anychart.color.darken(this.sourceColor);
}
function c() {
    return window.anychart.color.lighten(this.sourceColor);
}

export default {
    palette: {
            type: "distinct",
            items: "#40c4ff #0288d1 #9fa8da #5c6bc0 #7e57c2 #54dbdf #15a9c7 #00897b #304ffe #01579b".split(
            " "
        )
    },
    defaultOrdinalColorScale: {
        autoColors: function(d) {
            return window.anychart.color.blendedHueProgression(
                "#40c4ff",
                "#01579b",
                d
            );
        }
    },
    defaultLinearColorScale: { colors: ["#40c4ff", "#01579b"] },
    defaultFontSettings: {
        fontFamily: '"Lucida Console", Monaco, monospace',
        fontColor: "#546e7a",
        fontSize: 12
    },
    defaultBackground: {
        fill: "#eceff1",
        stroke: "#cfd8dc",
        cornerType: "round",
        corners: 0
    },
    defaultAxis: {
        stroke: "#b0bec5",
        ticks: { stroke: "#b0bec5" },
        minorTicks: { stroke: "#cfd8dc" }
    },
    defaultGridSettings: { stroke: "#b0bec5" },
    defaultMinorGridSettings: { stroke: "#cfd8dc" },
    defaultSeparator: { fill: "#cfd8dc" },
    defaultTooltip: {
        background: { fill: "#eceff1 0.9", corners: 3 },
        fontSize: 12,
        fontColor: "#78909c",
        title: { align: "center", fontSize: 14, fontColor: "#78909c", },
        padding: { top: 10, right: 15, bottom: 10, left: 15 },
        separator: { margin: { top: 10, right: 10, bottom: 10, left: 10 } }
    },
    defaultColorRange: {
        stroke: "#b0bec5",
        ticks: { stroke: "#b0bec5", position: "outside", length: 7, enabled: !0 },
        minorTicks: {
            stroke: "#b0bec5",
            position: "outside",
            length: 5,
            enabled: !0
        },
        marker: {
            padding: { top: 3, right: 3, bottom: 3, left: 3 },
            fill: "#b0bec5"
        }
    },
    defaultScroller: {
        fill: "#dfe1e3",
        selectedFill: "#b0bec5",
        thumbs: {
            fill: "#cfd8dc",
            stroke: "#b0bec5",
            hovered: { fill: "#eceff1", stroke: "#b0bec5" }
        }
    },
    chart: {
        defaultSeriesSettings: {
        candlestick: {
            normal: {
                risingFill: "#01579b",
                risingStroke: "#01579b",
                fallingFill: "#40c4ff",
                fallingStroke: "#40c4ff"
            },
            hovered: {
                risingFill: c,
                risingStroke: b,
                fallingFill: c,
                fallingStroke: c
            },
            selected: {
                risingStroke: "3 #01579b",
                fallingStroke: "3 #40c4ff",
                risingFill: "#333333 0.85",
                fallingFill: "#333333 0.85"
            }
        },
        ohlc: {
            normal: { risingStroke: "#01579b", fallingStroke: "#40c4ff" },
            hovered: { risingStroke: c, fallingStroke: c },
            selected: { risingStroke: "3 #01579b", fallingStroke: "3 #40c4ff" }
        }
        },
        title: { fontSize: 14 },
        padding: { top: 20, right: 25, bottom: 15, left: 15 }
    },
    pieFunnelPyramidBase: {
        normal: { labels: { fontColor: null } },
        connectorStroke: "#b0bec5",
        outsideLabels: { autoColor: "#546e7a" },
        insideLabels: { autoColor: "#37474f" }
    },
    map: {
        unboundRegions: { enabled: !0, fill: "#cfd8dc", stroke: "#b0bec5" },
        defaultSeriesSettings: {
            base: { normal: { labels: { fontColor: "#212121" } } },
            bubble: { normal: { stroke: b } },
            connector: {
                normal: { markers: { stroke: "1.5 #cfd8dc" } },
                hovered: { markers: { stroke: "1.5 #cfd8dc" } },
                selected: {
                    stroke: "1.5 #000",
                    markers: { stroke: "1.5 #cfd8dc", fill: "#000" }
                }
            }
        }
    },
    sparkline: {
        padding: 0,
        background: { stroke: "#eceff1" },
        defaultSeriesSettings: {
            area: { stroke: "1.5 #40c4ff", fill: "#40c4ff 0.5" },
            column: { fill: "#40c4ff", negativeFill: "#01579b" },
            line: { stroke: "1.5 #40c4ff" },
            winLoss: { fill: "#40c4ff", negativeFill: "#01579b" }
        }
    },
    bullet: {
        background: { stroke: "#eceff1" },
        defaultMarkerSettings: { fill: "#40c4ff", stroke: "2 #40c4ff" },
        padding: { top: 5, right: 10, bottom: 5, left: 10 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        rangePalette: {
            items: ["#90a4ae", "#b0bec5", "#cfd8dc", "#D6DEE1", "#E6EAED"]
        }
    },
    heatMap: {
        normal: { stroke: "1 #eceff1", labels: { fontColor: "#212121" } },
        hovered: { stroke: "1.5 #eceff1" },
        selected: { stroke: "2 #eceff1" }
    },
    treeMap: {
        normal: {
            headers: {
                background: { enabled: !0, fill: "#cfd8dc", stroke: "#b0bec5" }
            },
            labels: { fontColor: "#212121" },
            stroke: "#b0bec5"
        },
        hovered: {
            headers: {
                fontColor: "#546e7a",
                background: { fill: "#b0bec5", stroke: "#b0bec5" }
            }
        },
        selected: { labels: { fontColor: "#fafafa" }, stroke: "2 #eceff1" }
    },
    stock: {
        padding: [20, 30, 20, 60],
        defaultPlotSettings: {
            xAxis: { background: { fill: "#cfd8dc 0.5", stroke: "#b0bec5" } }
        },
        scroller: {
            fill: "none",
            selectedFill: "#cfd8dc 0.5",
            outlineStroke: "#b0bec5",
            defaultSeriesSettings: {
                base: { selected: { stroke: a } },
                candlestick: {
                    normal: {
                        risingFill: "#999",
                        risingStroke: "#999",
                        fallingFill: "#999",
                        fallingStroke: "#999"
                    },
                    selected: {
                        risingStroke: a,
                        fallingStroke: a,
                        risingFill: a,
                        fallingFill: a
                    }
                },
                ohlc: {
                    normal: { risingStroke: "#999", fallingStroke: "#999" },
                    selected: { risingStroke: a, fallingStroke: a }
                }
            }
        },
        xAxis: { background: { enabled: !1 } }
    }
};