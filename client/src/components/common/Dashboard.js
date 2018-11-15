import React, { Component } from 'react'
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      imageUrls: [],
      message: ''
    }
}

onSelectFiles = (event) => {
  let images = [];
  for (var i = 0; i < event.target.files.length; i++) {
        images[i] = event.target.files.item(i);
  }

  images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
  let message = `${images.length} valid image(s) selected`
  this.setState({ images, message })
}

onUploadImages = _ => {
  const uploaders = this.state.images.map(image => {
    const data = new FormData();
    data.append("image", image, image.name);
    data.append("file_key", 'user');
    
    return axios.post('/api/file/upload', data)
      .then(res => {
        const img_url = res.data.imageUrl;
        this.setState({imageUrls: [
          ...this.state.imageUrls,
          img_url
        ]});
      })
  });

  axios.all(uploaders).then(_ => {
    console.log('ok');
  }).catch(err => alert(err.message));
}

render() {
    return (
      <div>
        <br/>
        <div className="col-sm-12">
          <h1>Image Uploader</h1><hr/>
          <div className="col-sm-4">
            <input 
              className="form-control " 
              type="file" 
              onChange={this.onSelectFiles.bind(this)} 
              multiple/>
          </div>
          { this.state.message? <p className="text-info">{this.state.message}</p>: ''}
          <br/><br/><br/>
          <div className="col-sm-4">
              <button 
                className="btn btn-primary" 
                value="Submit" 
                onClick={this.onUploadImages.bind(this)}>Submit</button>
          </div>
          </div>
          
          <div className="row col my-5">
          { 
            this.state.imageUrls.map((url, i) => (
                <div className="col-lg-1" key={i}>
                  <img 
                    src={url}
                    className="img-rounded img-responsive" 
                    alt="not available"
                    style={{ width:100, height:100 }} /><br/>
                </div>
              ))
          }
        </div>
    </div>
    );
  }
}

export default Dashboard;