import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import DateRange from '@material-ui/icons/DateRange';
import DateRangeOutlined from '@material-ui/icons/DateRangeOutlined';
import format from 'date-fns/format';
import isFuture from 'date-fns/is_future';
import isPast from 'date-fns/is_past';
import React from 'react';
import { Link } from 'react-router-dom';

import { IconListItem } from '../../../../shared-components/IconListItem';
import { OutlineButton } from '../../../../shared-components/OutlineButton';
import { DATE_FORMAT } from '../../config';

const styles = () => ({
  card: {
    width: '100%',
  },
  active: {
    backgroundColor: green[500],
  },
  completed: {
    backgroundColor: red[500],
  },
  future: {
    backgroundColor: orange[500],
  },
  list: {
    padding: '0px',
  },
  noPaddingBottom: {
    paddingBottom: '0px',
  },
});

const BatchCardComponent = ({
  classes, batchInfo, index, batchCount, ...props
}) => {
  let activeClass = classes.active;
  if (isPast(batchInfo.endDate)) {
    activeClass = classes.completed;
  } else if (isFuture(batchInfo.startDate)) {
    activeClass = classes.future;
  }
  const count = batchCount - index;

  return (
    <Card className={classes.card} {...props}>
      <CardHeader
        className={classes.noPaddingBottom}
        avatar={<Avatar className={activeClass}>{count}</Avatar>}
        action={
          <OutlineButton size="small" component={Link} to={`/batch/${batchInfo._id}`}>
            Edit
          </OutlineButton>
        }
        title={batchInfo.batchNumber}
        subheader={batchInfo.city}
      />
      <CardContent>
        <List className={classes.list}>
          <IconListItem
            className={classes.noPaddingBottom}
            icon={<AssignmentOutlinedIcon />}
            primary={batchInfo.numberOfDays}
            secondary="Number of Days"
          />
          <IconListItem
            className={classes.noPaddingBottom}
            icon={<DateRangeOutlined />}
            primary={format(batchInfo.startDate, DATE_FORMAT)}
            secondary="Start Date"
          />
          <IconListItem
            className={classes.noPaddingBottom}
            icon={<DateRange />}
            primary={format(batchInfo.endDate, DATE_FORMAT)}
            secondary="End Date"
          />
        </List>
      </CardContent>
    </Card>
  );
};

export const BatchCard = withStyles(styles)(BatchCardComponent);
