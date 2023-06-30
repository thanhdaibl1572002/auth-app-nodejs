
/**
 * Regex cho first name: /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
 * 
 * `^` : Bắt đầu chuỗi.
 * 
 * `[a-zA-Z]+` : Bắt đầu bằng một ký tự chữ cái in hoa hoặc thường.
 * 
 * `([ '-][a-zA-Z]+)*` : Ký tự dấu cách (` `), dấu nối (`-`) hoặc dấu nháy đơn (`'`) được phép 
 * xuất hiện sau đó là một ký tự chữ cái in hoa hoặc thường. Điều này có thể lặp lại 0 lần hoặc nhiều lần.
 * 
 * `$` : Kết thúc chuỗi.
 */
export const FIRST_NAME_REGEX: RegExp = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/

/**
 * Regex cho last name: /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
 * 
 * `^` : Bắt đầu chuỗi.
 * 
 * `[a-zA-Z]+` : Bắt đầu bằng một ký tự chữ cái in hoa hoặc thường.
 * 
 * `([ '-][a-zA-Z]+)*` : Ký tự dấu cách (` `), dấu nối (`-`) hoặc dấu nháy đơn (`'`) được phép 
 * xuất hiện sau đó là một ký tự chữ cái in hoa hoặc thường. Điều này có thể lặp lại 0 lần hoặc nhiều lần.
 * 
 * `$` : Kết thúc chuỗi.
 */
export const LAST_NAME_REGEX: RegExp = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/

/**
 * Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
 * 
 * `^` : Bắt đầu chuỗi.
 * 
 * `[^\s@]+` : Bất kỳ ký tự nào trừ khoảng trắng và ký tự "@".
 * 
 * `@` : Ký tự "@", ký tự này phải có trong email.
 * 
 * `[^\s@]+\.[^\s@]+` : Tên miền của email. Bất kỳ ký tự nào trừ khoảng trắng và ký tự "@"
 * 
 * `$` : Kết thúc chuỗi.
 */
export const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Regex: `/^[0-9]{10}$/`
 * 
 * `^` : Bắt đầu chuỗi.
 * 
 * `[0-9]{10}` : Một chuỗi bao gồm đúng 10 chữ số.
 * 
 * `$` : Kết thúc chuỗi.
 */
export const PHONE_REGEX: RegExp = /^[0-9]{10}$/

/**
 * Regex: `/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/`
 * 
 * `^` : Bắt đầu chuỗi.
 * 
 * `(?=.*\d)` : Chuỗi phải chứa ít nhất một chữ số.
 * 
 * `(?=.*[a-z])` : Chuỗi phải chứa ít nhất một chữ cái thường.
 * 
 * `(?=.*[A-Z])` : Chuỗi phải chứa ít nhất một chữ cái in hoa.
 * 
 * `(?=.*[!@#$%^&*])` : Chuỗi phải chứa ít nhất một ký tự đặc biệt có trong danh sách `!@#$%^&*`.
 * 
 * `[0-9a-zA-Z!@#$%^&*]{8,}` : Chuỗi phải chứa ít nhất 8 ký tự từ số, chữ cái hoặc ký tự đặc biệt.
 * 
 * `$` : Kết thúc chuỗi.
 */
export const PASSWORD_REGEX: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/