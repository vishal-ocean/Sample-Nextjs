import moment from 'moment';

const getDaysByDispatchMethod: Record<string, number> = {
  DHLGlobalMail: 6,
  DHLExpress: 2,
  StandardLatvianPostMail: 10
};

export const expectedDeliveryDate = (date: string, method: string) => {
  return moment(date)
    ?.add(getDaysByDispatchMethod[method] || 10, 'days')
    ?.format('dddd, MMMM YY');
};
