import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import BoardColumn from './BoardColumn';

class TreeBoardColumn extends Component {
    renderTreeNode(treeNode) {
        const { onMoveTask, onDeleteTask, onAddTask } = this.props;
        if (treeNode.isLeaf) {
            return (
                <Col md={12} key={treeNode.status} style={{ height: '100%' }}>
                    <BoardColumn
                        onMoveTask={onMoveTask}
                        onDeleteTask={onDeleteTask}
                        onAddTask={onAddTask}
                        tasksItem={treeNode}
                    />
                </Col>
            )
        } else {
            return (
                <Row
                    key={treeNode.status}
                    className="justify-content-center"
                    style={{
                        flexWrap: 'wrap'
                    }}
                >
                    <h2>{treeNode.status}</h2>
                    {treeNode.tasks.length != 0 ?
                        treeNode.tasks.map((node) => (
                            this.renderTreeNode(node)
                        ))
                        :
                        <Col md={12} key={treeNode.status} style={{ height: '100%' }}>
                            <BoardColumn
                                onMoveTask={onMoveTask}
                                onDeleteTask={onDeleteTask}
                                onAddTask={onAddTask}
                                tasksItem={treeNode}
                            />
                        </Col>
                    }
                </Row>
            );
        }
    }

    render() {
        const { treeNode } = this.props;
        return this.renderTreeNode(treeNode);
    }
}

export default TreeBoardColumn;