import React from 'react';

export const ALERT_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error'
}

const Alert = (props) => {
  const alertType = props.alertType;

  let className = '';
  let icon;
  switch (alertType) {
    case 'success':
      className = 'alert-success';
      icon = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      break;
    case 'error':
      className = 'alert-error';
      icon = <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      break;
    default:
      icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
      break;
  }


  return (
    <div className={`alert ${className} shadow-lg w-4/5 max-w-m relative`}>
      <div>
        {icon}
        {props.children}
      </div>
    </div>
  )
}

export default Alert