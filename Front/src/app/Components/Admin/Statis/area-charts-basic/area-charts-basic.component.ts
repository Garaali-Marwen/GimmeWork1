import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import {HttpErrorResponse} from "@angular/common/http";
import {OffreService} from "../../../../Services/offre.service";
import {Offres} from "../../../../Entity/Offres";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-area-charts-basic',
  templateUrl: './area-charts-basic.component.html',
  styleUrls: ['./area-charts-basic.component.css']
})
export class AreaChartsBasicComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  annee: number = new Date().getFullYear();
  offres: Offres[] = [];
  offrePourcentage!: number[];
  ngOnInit(): void {
    this.getOffres();
  }

  constructor(private offreService: OffreService) {}

  public getOffres(): void{
    this.offreService.getOffres().subscribe(
            (responce:Offres[]) => {
              /*this.offres = responce;
              this.offrePourcentage = [];
              let a = 1;
              let b = 2;
              for (let j=0;j<10; j++){
                var n = 0;
                for (let offre of this.offres){
                  if((offre.date_ajout <= "01-01-"+this.annee) && (offre.date_ajout < "01-12-"+this.annee)){
                    n++;
                  }
                }
                this.offrePourcentage.push(Math.round((100/(this.offres.length/n))*100)/100);
                a+=1;
                b+=1;
              }
              console.log(this.offrePourcentage)*/

              this.chartOptions = {
                series: [
                  {
                    name: "Inflation",
                    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
                  }
                ],
                chart: {
                  height: 350,
                  type: "bar"
                },
                plotOptions: {
                  bar: {
                    dataLabels: {
                      position: "top" // top, center, bottom
                    }
                  }
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (val: any) {
                    return val + "%";
                  },
                  offsetY: -20,
                  style: {
                    fontSize: "12px",
                    colors: ["#304758"]
                  }
                },

                xaxis: {
                  categories: [
                    "Jan",
                    "Fév",
                    "Mar",
                    "Avr",
                    "Mai",
                    "Juin",
                    "Juil",
                    "Août",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Déc"
                  ],
                  position: "top",
                  labels: {
                    offsetY: -18
                  },
                  axisBorder: {
                    show: false
                  },
                  axisTicks: {
                    show: false
                  },
                  crosshairs: {
                    fill: {
                      type: "gradient",
                      gradient: {
                        colorFrom: "#D8E3F0",
                        colorTo: "#BED1E6",
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5
                      }
                    }
                  },
                  tooltip: {
                    enabled: true,
                    offsetY: -35
                  }
                },
                fill: {
                  type: "gradient",
                  gradient: {
                    shade: "light",
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [50, 0, 100, 100]
                  }
                },
                yaxis: {
                  axisBorder: {
                    show: false
                  },
                  axisTicks: {
                    show: false
                  },
                  labels: {
                    show: false,
                    formatter: function (val: any) {
                      return val + "%";
                    }
                  }
                },
                title: {
                  text: "Offres ajoutées par mois pour l'année " + this.annee,
                  floating: 0,
                  offsetY: 320,
                  align: "center",
                  style: {
                    color: "#444"
                  }
                }
              };
            },
        (error: HttpErrorResponse) => {
          alert(error.message);
        });
  }
}