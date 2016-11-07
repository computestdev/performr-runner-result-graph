// quick and dirty setting to add extra pixels to the width of the plot area
// This ensures that events will not fall behind the vertical scrollbar
export const PLOT_EXTRA_PIXELS = 50;

const getScriptPlotWidth = (resultObject, pixelsPerMillisecond) => {
    const duration = resultObject.getIn(['timing', 'duration']);
    return duration * pixelsPerMillisecond + PLOT_EXTRA_PIXELS;
};

export default getScriptPlotWidth;
