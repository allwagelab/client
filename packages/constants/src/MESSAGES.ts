const AUTH = {
  EMAIL: {
    AVAILABLE: '사용 가능한 이메일입니다.',
    EMPTY: '이메일을 입력해주세요.',
    INVALID_FORMAT: '올바른 이메일 형식을 입력해주세요.',
    REQUIRED_DUPLICATION_CHECK: '이메일 중복 확인이 필요합니다.',
    DUPLICATED: '이미 사용 중인 이메일입니다.',
    NOT_FOUND: '가입된 정보가 없습니다. 이메일을 한번 더 확인해주세요.',
    DUPLICATED_ERROR: '이메일 중복 확인 중 오류가 발생했습니다.',
    CHECK_TEMP_PASSWORD: '이메일로 임시 비밀번호를 발송했습니다. 이메일을 확인해주세요.',
  },
  PASSWORD: {
    INVALID_FORMAT: '비밀번호는 영문, 숫자 특수문자 조합 8자 이상 입력해주세요.',
    EMPTY: '비밀번호를 입력해 주세요.',
    REENTER: '비밀번호를 다시 입력해 주세요.',
    NOT_MATCHED: '비밀번호가 일치하지 않습니다.',
    TEMP_REQUEST_ERROR: '임시 비밀번호 발급 중 오류가 발생했습니다.',
    EMPTY_TEMP: '임시 비밀번호를 입력해주세요.',
    WRONG_TEMP: '임시 비밀번호가 올바르지 않습니다.',
  },
  PHONE: {
    EMPTY: '휴대폰 번호를 입력해주세요.',
    INVALID_FORMAT: '올바른 휴대폰 번호 형식이 아닙니다.',
    DUPLICATED: '이미 존재하는 휴대폰 번호입니다.',
    NOT_FOUND: '존재하지 않는 휴대폰 번호입니다.',
    UNAUTHORIZED_CODE: '인증번호를 확인해 주세요.',
    VERIFICATION_REQUEST_ERROR: '휴대폰 인증 요청 중 오류가 발생했습니다.',
    VERIFICATION_CHECK_ERROR: '휴대폰 인증번호 확인 중 오류가 발생했습니다.',
    REQUIRED_CHECK: '휴대폰 인증이 필요합니다.',
    VERIFIED: '휴대폰 인증이 완료되었습니다.',
  },
  BUSINESS: {
    NAME: {
      EMPTY: '사업장 이름을 입력해주세요.',
    },
    REGISTRATION_NUMBER: {
      AVAILABLE: '등록 가능한 사업자 번호입니다.',
      EMPTY: '사업장 등록 번호를 입력해주세요.',
      INVALID_FORMAT: '올바른 사업자 등록번호 형식이 아닙니다.',
      DUPLICATED: '이미 등록된 사업자 등록 번호입니다.',
      NOT_FOUND: '유효하지 않은 사업자 등록 번호입니다.',
      ERROR: '사업자 등록 번호 확인 중 오류가 발생했습니다.',
      REQUIRED_CHECK: '사업자 등록번호 중복 확인이 필요합니다.',
    },
    EMPLOYEE: {
      NOT_SELECTED: '직원 수를 선택해주세요.',
    },
  },
  VERIFICATION_CODE: {
    SENT: '인증번호를 발송했습니다. 최대 3분이 소요될 수 있습니다.',
    EXPIRED: '인증 시간이 만료되었습니다. 다시 시도해주세요.',
    EMPTY: '인증번호를 입력해주세요.',
  },
  LOG_IN: {
    DONE: '성공적으로 로그인되었습니다.',
    UNAUTHORIZED: '이메일과 비밀번호가 일치하지 않습니다.',
    ERROR: '로그인 중 오류가 발생했습니다.',
  },
  SIGN_UP: {
    UNAUTHORIZED: '회원가입에 실패했습니다.',
    ERROR: '회원가입 중 오류가 발생했습니다.',
  },
  LOG_OUT: {
    DONE: '성공적으로 로그아웃되었습니다.',
  },
  EXPIRED: '인증이 만료되었습니다.',
}

export const MESSAGES = {
  AUTH,
} as const
