import React, { Component } from 'react';
class Getweather extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          latitude: "",
          longitude:"",
          cityName:"",
          temparatureDetails:[],
          weatherData:[]
        };
      }
    
      componentDidMount() {
        fetch("https://weathersync.herokuapp.com/ip")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                latitude: result.latitude,
                longitude: result.longitude
              });
               fetch("https://weathersync.herokuapp.com/weather/"+this.state.latitude+","+this.state.longitude)
              .then(res => res.json())
              .then( (weatherResponse) => {
             console.log(weatherResponse)
              this.setState(
                  {
                      weatherData:weatherResponse.weather,
                      cityName: weatherResponse.name,
                      temparatureDetails : weatherResponse.wind
                });
            })
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

      renderWeatherDetails(weatherDetails,temparatureDetails){
        if(weatherDetails[0] !== undefined ){
            const imageSrc="http://openweathermap.org/img/w/"+weatherDetails[0].icon+".png";
            const weatherApiUrl="https://weathersync.herokuapp.com/weather/"+this.state.latitude+","+this.state.longitude;
            return (
            <div className="row">
                <div class="weather-card">
				<div class="top">
					<div class="wrapper">
						<h1 class="heading text-center">CURRENT CONDITIONS FOR:</h1>
						<h2 class="heading text-center">{this.state.cityName}</h2>
						<p class="temp text-center">
							<span class="temp-value"> {temparatureDetails.deg}</span>
							<span class="deg">0</span>
							<span class="temp-type">F</span>
						</p>
                        <img src={imageSrc} class="rounded mx-auto d-block center-block" alt="..." width="100"/>
                        <h2 class="heading text-center text-capitalize">{weatherDetails[0].description}</h2><br/>
                        <h4 className="text-center"><a href={weatherApiUrl} class="text-capitalize" target="_blank">Click Here To View Response Data of API</a></h4>
					</div>
				</div>
                </div> 
            </div>
            )
        } else {
            return '';
        }
      }
    
      render() {
        const  isLoaded=this.state;
        const weatherDetails = this.state.weatherData
        const temparatureDetails=this.state.temparatureDetails
        
       if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
          <div>
              
              {this.renderWeatherDetails(weatherDetails,temparatureDetails)}
        </div>
          );
        }
      }
    }

export default Getweather;