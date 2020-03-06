import React from 'react';
import { Upload, Button, message } from 'antd';
import styled from 'styled-components';
import axios from "axios";
import 'antd/dist/antd.css';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 3px;
  margin-top: 60px;

`;


function makeRequest(file: File): Promise<string> {
  const data = new FormData();
  data.append('files', file, file.name)
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }

  return (
    axios.post(`/api/`, data, config).then(resp => resp.data)
    );
  
}

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

export interface State {
  file?: File
  submitted: boolean
}
export interface Props {}

export class UploadExample extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
        file: undefined,
        submitted: false
    }
  }

  onFileUpload = (info: any) => {

    const { status } = info.file;
    if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);

                this.setState({
                    file: info.file.originFileObj
                });
    } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
    }
  }

  onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (this.state.file === undefined) {
        message.error("Upload a file before submitting!")
      } else {
        this.setState({
          submitted: true,
      },
      () => makeRequest(this.state.file as File).then(result => {

          })
      )
      }
  }

  render() {
    return (

      <form onSubmit={e => this.onFormSubmit(e)}>
        <Upload
          multiple={false}
          onChange={ (info) => this.onFileUpload(info)}
          customRequest={dummyRequest}
          action={undefined}
        >
        <Button size="large">Upload a file!</Button>
        </Upload>
        <Button htmlType="submit" disabled={this.state.submitted}> 
          Submit.
        </Button>
      </form> 
    );
  }
}

function App() {
  return (
    <Container>
    <UploadExample/>
    </Container>
  );
}

export default App;
