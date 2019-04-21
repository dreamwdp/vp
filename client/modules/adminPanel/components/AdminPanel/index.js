import React from 'react';
import { Table, Icon, Card, Button, Popconfirm, Tooltip, Modal } from 'antd';
import ColorCanvas from '../../../color/components/Box/components/ColorCanvas';
import ColorBar from '../ColorBar';
import style from './style.sass';

class AdminPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    const me = this;
    me.state = {
      showModal: false,
      modalContent: ''
    }
  }

  onApprove(record){
    const me = this;
    me.props.onApprove(record.id);
  };

  onDelete(record){
    const me = this;
    me.props.onDelete(record.id);
  }

  showInModal(record){
    const me = this;
    me.setState({
      showModal: true,
      modalContent: record.color
    })
  }
  onModalClose(){
    let me = this;
    me.setState({
      showModal: false
    });
  }

  getColumns(){
    const me = this;
    const columns = [
      {
        title: 'Create',
        dataIndex: 'createdate',
        key: 'createdate'
      },

      {
        title: 'Color',
        key: 'color',
        render: (text, record, index) => (
          <ColorBar value={record.color} />
        )
      },
      {
        title: 'Like',
        dataIndex: 'like',
        key: 'like'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => {
          return (
            <div>
              <Tooltip title="View">
                <Button
                  shape="circle"
                  className={style.btn}
                  icon="eye"
                  onClick={me.showInModal.bind(me, record)}
                  />
              </Tooltip>

              <Popconfirm
                title="Sure to approve?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={me.onApprove.bind(me, record)}
                >
                <Button
                  shape="circle"
                  icon="check"
                  className={style.btn}
                  />
              </Popconfirm>
              <Popconfirm
                title="Sure to delete?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={me.onDelete.bind(me,record)}
                >
                <Button
                  shape="circle"
                  icon="delete"
                  />
              </Popconfirm>
            </div>
          );
        }
      }
    ];

    return columns;
  }

  render() {
    const me = this;
    return (<Card
      className={style.container}
      style={{minHeight: window.innerHeight * 0.85}}
      title={<span><Icon type="info-circle" />&nbsp;&nbsp;&nbsp;Color Management</span>}>

      <Table
        columns={me.getColumns()}
        rowKey="id"
        dataSource={me.props.list.toJS()}
        pagination={false}
        />
      <Modal title="Color Preview" visible={me.state.showModal}
             onOk={me.onModalClose.bind(me)} onCancel={me.onModalClose.bind(me)}>
        <ColorCanvas colorValue={me.state.modalContent}/>
      </Modal>
    </Card>);
  }
}

export default AdminPanel;