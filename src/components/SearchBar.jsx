import axios from 'axios';
import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            city: '',
            zipCodes: [],
            states: []
        };
        this.getDetails = this.getDetails.bind(this);
        this.setCityName = this.setCityName.bind(this);
    }
    getDetails(){   
        axios.get(`http://ctp-zip-api.herokuapp.com/city/${this.state.city}`)
        .then( response => {
            this.setState({
                zipCodes: response.data
            })
            /*
            for(let i = 0; i < response.data.length; i++){
                axios.get(`http://ctp-zip-api.herokuapp.com/zip/${response.data[i]}`)
                .then(function (res){
                    console.log(res.data.map(s => s["State"]));
                })
                .catch(function (error) {
                    console.log("im error")
                })
            }
            */      
        })
        .catch(e =>{
            console.log(e);
        })
    }
    setCityName(event){
        this.setState({
            city: event.target.value.toUpperCase()
        })
    }
    render(){
        let elements = this.state.zipCodes.map((e,i) => <div key={i}>{e}</div>)
        return <div>
                    <div className="banner">
                        <p>Zipcode Finder</p>
                    </div>
                    <div className="search-bar">
                        <input type="text" onChange={this.setCityName} placeholder="city name"></input>
                        <button onClick={this.getDetails}>search</button>
                    </div>
                    <div className="code-list"> 
                            {elements}     
                    </div>
                
                </div>
        }
    }

export default SearchBar;