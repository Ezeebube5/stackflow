import JobQueue from "../config/queue.config";
import { SubscriptionInstance } from "../model/subscription.model";

interface emailObj {
  to: Array<string | SubscriptionInstance>,
  subject: string,
  html: string
}


class EmailUtils {

  async dispatchEmail(EmailDetails: emailObj): Promise<object | null> {
    try {
      // add email to queue
      JobQueue.add(
        'sendEmail',
        {
          EmailDetails,
        },
        {
          attempts: 3,
        }
      );
      return { msg: 'Email Dispatched', EmailDetails }
    } catch (err) {
      return null
    }
  }

  objArrToStrArr(objArr: any): Array<string> {
    const StrArr: Array<string> = []
    for (let i = 0; i < objArr.length; i++) {
      StrArr.push(objArr[i].user_email)

    }
    return StrArr;
  }
}

export default new EmailUtils();