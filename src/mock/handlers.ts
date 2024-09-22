import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://pokeapi.co/api/v2/pokemon", () => {
    // 測試成功
    return HttpResponse.json({ name: "John Maverick" });
    // 測試網路錯誤
    // return HttpResponse.error();
    // 測試伺服器響應的錯誤
    // return HttpResponse.json(
    //   {
    //     reason: "This email address is already in use",
    //     error: "User already exists",
    //     result_code: 932,
    //   },
    //   { status: 400 }
    // );
  }),
];
