import React from 'react';
import { Row, Col } from 'reactstrap';
import BoardColumn from './BoardColumn';

const DynamicBoardColumn = ({ treeNode, handleMoveTask, handleDeleteTask, handleAddTask }) => {
    if (!treeNode.isLeaf) {
        return (
            <Row
                key={treeNode.status}
                className="justify-content-center"
                style={{
                    flexWrap: 'wrap'
                }}
            >
                {treeNode.tasks.map((node) => (
                    <DynamicBoardColumn
                        key={node.status}
                        treeNode={node}
                        handleMoveTask={handleMoveTask}
                        handleDeleteTask={handleDeleteTask}
                        handleAddTask={handleAddTask}
                    />
                ))}
            </Row>
        );
    } else {    
        return (
            <Col key={treeNode.status} md={12}>
                <BoardColumn
                    onMoveTask={handleMoveTask}
                    onDeleteTask={handleDeleteTask}
                    onAddTask={handleAddTask}
                    status={treeNode.status}
                    tasks={treeNode.tasks}
                    title={treeNode.title}
                    isLeaf={treeNode.isLeaf }
                />
            </Col>
        );
    }
};

export default DynamicBoardColumn;
