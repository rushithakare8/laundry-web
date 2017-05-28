import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import cx from 'classnames';
import { getTasks } from './data/actions/tasks';

const initialData = {
  labels: [],
  datasets: [],
};

class ProgressTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { idOrder: 0 };
    this.getTasksHandler = this.getTasksHandler.bind(this);
    this.orderIdChangeHandler = this.orderIdChangeHandler.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { tasks } = nextProps;
    if (tasks && tasks.length) {
      this.chart = new Chart(this.chartContainer, {
        type: 'doughnut',
        data: initialData,
        options: {
          title: {
            display: true,
            text: 'El progreso de tu orden:',
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      const { labels, data, backgroundColor, completed } = tasks.reduce((agg, t) => Object.assign({}, agg, {
        labels: [...agg.labels, t.task.description.toUpperCase()],
        data: [...agg.data, (100 / tasks.length)],
        backgroundColor: [...agg.backgroundColor, (t.status ? '#1D781D' : '#96281B')],
        completed: t.status ? agg.completed + 1 : agg.completed,
      }), { labels: [], data: [], backgroundColor: [], completed: 0 });
      this.completed = Math.round((100 / tasks.length) * completed);
      this.chart.data.labels = labels;
      this.chart.data.datasets = [{ data, backgroundColor }];
      this.chart.update();
    }
  }
  getTasksHandler() {
    const { idOrder } = this.state;
    if (idOrder) {
      this.props.getTasks(idOrder);
    }
  }
  orderIdChangeHandler(evt) {
    const value = evt.target.value;
    this.setState({ idOrder: value });
  }
  render() {
    const { tasks, config } = this.props;
    return (
      <div className="row">
        <div className="small-12 columns">
          <h3>Rastrea tu Orden</h3>
        </div>
        <div className="small-12 columns">
          <div className="input-group">
            <span className="input-group-label">Orden #</span>
            <input className="input-group-field" type="text" placeholder="Numero de Orden" onChange={this.orderIdChangeHandler} />
            <div className="input-group-button">
              <button className="hollow button" onClick={this.getTasksHandler}><i className="fa fa-search" /></button>
            </div>
          </div>
        </div>
        {config.error ? (
          <div className="small-12 columns">
            <h4>{config.msg}</h4>
          </div>
        ) : null}
        <div className={cx('small-12 columns', { 'Op(0)': config.error || !tasks.length || config.loading })}>
          <canvas ref={(c) => { this.chartContainer = c; }} />
          <div className="Ta(c)">
            <h1 className="perc">{this.completed}%</h1>
          </div>
        </div>
      </div>
    );
  }
}

ProgressTracker.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  config: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  config: state.config,
});

export default connect((mapStateToProps), {
  getTasks,
})(ProgressTracker);
