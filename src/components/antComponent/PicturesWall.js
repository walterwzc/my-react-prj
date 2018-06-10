import React, { PureComponent } from 'react'
import { Upload, Icon, Modal } from 'antd'

class PicturesWall extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            companyID: '',
            companyLogoURL: '',
            previewVisible: false,
            previewImage: '',
            fileList: []
        }
    }

    handleCancel = () => this.setState({
        previewVisible: false 
    })

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }

    handleChange = ({ fileList }) => {
        return this.setState({
            fileList 
        })
    }

    componentWillReceiveProps(newProps) {
        if(newProps.companyLogoURL !== this.props.companyLogoURL){
            this.setState({
                fileList: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: `http://localhost:4000/uploads/${newProps.companyLogoURL}`
                }],
                positionID: newProps.positionID
            });
        }
    }

    // getBase64(img, callback) {
    //     const reader = new FileReader()
    //     reader.addEventListener('load', () => callback(reader.result))
    //     reader.readAsDataURL(img)
    // }

    // handlePictureChange = info => {
    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         this.getBase64(info.file.originFileObj, imageUrl => {

    //             // 将获取的 文件信息传递给父级处理
    //             console.log('handlePictureChange');
    //             this.props.getPicInfo(info.file);

    //             return 0;
    //             // return this.setState({ imageUrl })
    //         })
    //     }
    // }



    // 如果没有使用 PureComponent， 那么就需要在 shouldComponentUpdate 之中进行判断
    // shouldComponentUpdate(nextProps){
    //     if(nextProps.positionID !== this.props.positionID ) {
    //         return true
    //     }
    //     return false
    // }

    render() {
        // console.log('Picture Wall Render');
        const { previewVisible, previewImage, fileList } = this.state
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )

        return (
            <div className="clearfix">
                <Upload
                    name="companyLogo"
                    action={`api/position/edit/${this.state.positionID}`}
                    listType="picture-card"

                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange.bind(this)}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img
                        alt="example"
                        style={{ width: '100%' }}
                        src={previewImage}
                    />
                </Modal>
            </div>
        )
    }
}

export default PicturesWall;
