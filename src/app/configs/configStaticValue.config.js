const genderList = [{title: 'ชาย', value: 'MALE'}, {title: 'หญิง', value: 'FEMALE'}];
const planList = [
  {title: 'package 1 (benefit 200k)', value: 'T11A20'},
  {title: 'package 2 (benefit 500k)', value: 'T11A50'},
  {title: 'package 3 (benefit 1M)', value: 'T11AM1'}
];
const paymentPeriodList = [
  {title: 'รายปี', value: 'YEARLY'},
  {title: 'รายครึ่งปี', value: 'HALFYEARLY'},
  {title: 'ราย 3 เดือน', value: 'QUARTERLY'},
  {title: 'รายเดือน', value: 'MONTHLY'}
];
const displayPeriod = {
  'YEARLY': 'ปี',
  'HALFYEARLY': 'ครึ่งปี',
  'QUARTERLY': '3 เดือน',
  'MONTHLY': 'เดือน'
};
const calType = [
  {title: 'คำนวนเบี้ยประกัน', value: 'calType1'},
  {title: 'คำนวณทุนประกัน', value: 'calType2'}
];
const displayType = {
  calType1: 'ทุนประกัน',
  calType2: 'เบี้ยประกัน'
};

export {
  genderList,
  planList,
  paymentPeriodList,
  calType,
  displayType,
  displayPeriod
};