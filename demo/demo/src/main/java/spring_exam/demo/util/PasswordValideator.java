package spring_exam.demo.util;

import java.util.regex.Pattern;

public class PasswordValideator {
    // 비밀번호 유효성 검사 메소드
    public static boolean isValidPassword(String password) {
        // 최소 8자 이상, 대소문자 및 숫자 포함 여부를 정규식으로 검사
        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";
        Pattern pattern = Pattern.compile(regex);
        return pattern.matcher(password).matches();
    }

    // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인하는 메소드
    public static boolean isPasswordMatch(String newPassword, String newPasswordConfirm) {
        return newPassword != null && newPassword.equals(newPasswordConfirm);
    }
}
