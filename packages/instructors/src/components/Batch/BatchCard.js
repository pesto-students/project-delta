import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import DateRange from '@material-ui/icons/DateRange';
import DateRangeOutlined from '@material-ui/icons/DateRangeOutlined';
import React from 'react';
import format from 'date-fns/format';
import isWithinRange from 'date-fns/is_within_range';

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
  list: {
    padding: '0px',
  },
  noPaddingBottom: {
    paddingBottom: '0px',
  },
});

const BatchCardComponent = ({
  classes, batchInfo, onEdit, ...props
}) => {
  const today = new Date();
  const isBatchActive = isWithinRange(today, batchInfo.startDate, batchInfo.endDate);
  const activeClass = isBatchActive ? classes.active : classes.completed;

  return (
    <Card className={classes.card} {...props}>
      <CardHeader
        className={classes.noPaddingBottom}
        avatar={<Avatar className={activeClass}>{batchInfo.batchNumber}</Avatar>}
        action={
          <OutlineButton size="small" onClick={onEdit} data-id={batchInfo._id}>
            Edit
          </OutlineButton>
        }
        title={batchInfo.batchId}
        subheader={batchInfo.city}
      />
      <CardContent>
        <List className={classes.list}>
          <IconListItem
            className={classes.noPaddingBottom}
            icon={<AssignmentOutlinedIcon />}
            primary={batchInfo.NumberOfDays}
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
