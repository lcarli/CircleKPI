/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {

    interface circleKPIVisual {
        color: string;
    }
    export class Visual implements IVisual {
        private target: HTMLElement;
        private host: IVisualHost;
        private updateCount: number;
        private svg: d3.Selection<SVGElement>;

        constructor(options: VisualConstructorOptions) {
            let svg = this.svg = d3.select(options.element)
                .append('svg').classed('circle-g', true);

            this.svg.append("circle")
                .attr("cx", "50%")
                .attr("cy", "50%")
                .attr("r", "30%")
                .attr("class", "gp-circle")
                .style("fill", 'green');
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            let instances: VisualObjectInstance[] = [];
            console.log(options.objectName);
            return instances;
        }

        public update(options: VisualUpdateOptions) {
            var dataset = options.dataViews[0];
            var value = dataset.categorical.values[0].values[0];
            var targetValue = dataset.categorical.values[1].values[0];
            if (value < targetValue) {
                //RED
                this.svg.select("circle").style("fill", "RED");
            }
            else if (value == targetValue) {
                //YELLOW
                this.svg.select("circle").style("fill", "YELLOW");
            }
            else {
                //GREEN
                this.svg.select("circle").style("fill", "GREEN");
            }
        }
    }
}