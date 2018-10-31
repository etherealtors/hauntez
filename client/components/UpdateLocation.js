import React, {Component} from 'react' 
import {connect} from 'react-redux';  
import {withRouter} from 'react-router-dom';
import {updateLocation, getOneLocation} from '../store/locations'; 
//user uploading this will need to be decided/built somewhere 
//also does not have amenities 

class UpdateLocation extends Component { 
    constructor(props) { 
        super(props); 
        this.state = {
            id: this.props.location.state.singleLocation.id, //security issue? 
            address: this.props.location.state.singleLocation.address, 
            imageUrl: this.props.location.state.singleLocation.imageUrl, 
            quantity: this.props.location.state.singleLocation.quantity, 
            description: this.props.location.state.singleLocation.description, 
            price: this.props.location.state.singleLocation.price,
            category: this.props.location.state.singleLocation.category
        }
        this.handleChange= this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    } 

    // componentDidMount(){ 
    //     let locationId = Number(this.props.match.params.locationId); 
    //     this.props.getLocation(locationId); 
    //     this.setState({ 
    //         id: this.props.singleLocation.id, //security issue? 
    //         address: this.props.singleLocation.address, 
    //         imageUrl: this.props.singleLocation.imageUrl, 
    //         quantity: this.props.singleLocation.quantity, 
    //         description: this.props.singleLocation.description, 
    //         price: this.props.singleLocation.price,
    //         category: this.props.singleLocation.category
    //     })
    // }

    handleChange(event){ 
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit(event){ 
        event.preventDefault(); 
        console.log('reached handlesubmit', this.props.addLocation)
        const updatedLocation = {...this.state}
        this.props.updateLocation(updatedLocation)
    }

    render(){ 

        
        console.log('update Location props', this.props); 
        return(
            <div className ="update-location">
                <h2>Update a Location</h2> 
                <form> 
                    <label> 
                        Select Listing Type: 
                        <input type="radio" name="category" value="Shack" onChange={this.handleChange}/>Shack
                        <input type="radio" name="category" value="House" onChange={this.handleChange}/>House
                        <input type="radio" name="category" value="Apartment" onChange={this.handleChange}/>Apartment
                        <input type="radio" name="category" value="Manse" onChange={this.handleChange}/>Manse
                        <input type="radio" name="category" value="Castle" onChange={this.handleChange}/>Castle
                        <input type="radio" name="category" value="Boat" onChange={this.handleChange}/>Boat
                    </label>
                    <label> 
                        Address: 
                        <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                    </label>
                    <label> 
                        Description: 
                        <input type="text" name="descriptionInput" value={this.state.description} onChange={this.handleChange}/>
                    </label>
                    <label> 
                        Number of Available Haunts: 
                        <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange}/>
                    </label>
    description             <label> 
                        Price per Haunt: 
                        <input type="number" name="price" value={this.state.price} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Image URL: 
                        <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.handleChange}/> 
                    </label>
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('reached map dispatch to props')
    return (
    { 
        updateLocation: (updatedLoc) => dispatch(updateLocation(updatedLoc)), 
        getLocation: (id) => dispatch(getOneLocation(id))
    }
)}

// const mapStateToProps = (state) => (
//     { 
//         singleLocation: state.locations.selectedLocation
//     }
// )

export default withRouter(connect(null, mapDispatchToProps)(UpdateLocation))
