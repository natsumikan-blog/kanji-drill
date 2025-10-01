import { useEffect, useMemo, useRef, useState } from "react";

// —— 設定ここから ——
// 出題リスト
const KANJI_LIST: { kanji: string; yomi: string | string[] }[] = [
  { kanji: "学校", yomi: "がっこう" },
  { kanji: "一日", yomi: "ついたち" },
  { kanji: "早速", yomi: "さっそく" },
  { kanji: "子", yomi: "こ" },
  { kanji: "天気", yomi: "てんき" },
  { kanji: "画数", yomi: "かくすう" },
  { kanji: "図書", yomi: "としょ" },
  { kanji: "教室", yomi: "きょうしつ" },
  { kanji: "番組", yomi: "ばんぐみ" },
  { kanji: "昼食", yomi: "ちゅうしょく" },
  { kanji: "事", yomi: "こと" },
  { kanji: "意味", yomi: "いみ" },
  { kanji: "動作", yomi: "どうさ" },
  { kanji: "発表", yomi: "はっぴょう" },
  { kanji: "相当", yomi: "そうとう" },
  { kanji: "練", yomi: "れん" },
  { kanji: "想", yomi: "そう" },
  { kanji: "親族", yomi: "しんぞく" },
  { kanji: "作業", yomi: "さぎょう" },
  { kanji: "始発", yomi: "しはつ" },
  { kanji: "農業", yomi: "のうぎょう" },
  { kanji: "円", yomi: "えん" },
  { kanji: "真面目", yomi: "まじめ" },
  { kanji: "車両", yomi: "しゃりょう" },
  { kanji: "理由", yomi: "りゆう" },
  { kanji: "細工", yomi: "さいく" },
  { kanji: "用", yomi: "よう" },
  { kanji: "電池", yomi: "でんち" },
  { kanji: "一面", yomi: "いちめん" },
  { kanji: "文化祭", yomi: "ぶんかさい" },
  { kanji: "暑中", yomi: "しょちゅう" },
  { kanji: "湖", yomi: "みずうみ" },
  { kanji: "読点", yomi: "とうてん" },
  { kanji: "予習", yomi: "よしゅう" },
  { kanji: "整理", yomi: "せいり" },
  { kanji: "放", yomi: "はなつ" },
  { kanji: "打開", yomi: "だかい" },
  { kanji: "家路", yomi: "いえじ" },
  { kanji: "温", yomi: ["おん", "あたた"] },
  { kanji: "八百屋", yomi: "やおや" },
  { kanji: "写真", yomi: "しゃしん" },
  { kanji: "第一人者", yomi: "だいいちにんしゃ" },
  { kanji: "拾", yomi: "ひろ" },
  { kanji: "息", yomi: "いき" },
  { kanji: "向", yomi: "むか" },
  { kanji: "反", yomi: "はん" },
  { kanji: "追放", yomi: "ついほう" },
  { kanji: "多様", yomi: "たよう" },
  { kanji: "口調", yomi: "くちょう" },
  { kanji: "失礼", yomi: "しつれい" },
  { kanji: "銀色", yomi: "ぎんいろ" },
  { kanji: "練習", yomi: "れんしゅう" },
  { kanji: "借りる", yomi: "かりる" },
  { kanji: "芽", yomi: "め" },
  { kanji: "司書", yomi: "ししょ" },
  { kanji: "治す", yomi: "なおす" },
  { kanji: "実験", yomi: "じっけん" },
  { kanji: "機会", yomi: "きかい" },
  { kanji: "動く", yomi: "うごく" },
  { kanji: "熱湯", yomi: "ねっとう" },
  { kanji: "害虫", yomi: "がいちゅう" },
  { kanji: "取材", yomi: "しゅざい" },
  { kanji: "焼く", yomi: "やく" },
  { kanji: "速", yomi: "そく" },
  { kanji: "初", yomi: "はつ" },
  { kanji: "競", yomi: "けい" },
  { kanji: "器用", yomi: "きよう" },
  { kanji: "束", yomi: "たば" },
  { kanji: "上達", yomi: "じょうたつ" },
  { kanji: "失望", yomi: "しつぼう" },
  { kanji: "期待", yomi: "きたい" },
  { kanji: "伝記", yomi: "でんき" },
  { kanji: "悪天候", yomi: "あくてんこう" },
  { kanji: "式", yomi: "しき" },
  { kanji: "昭和", yomi: "しょうわ" },
  { kanji: "印刷", yomi: "いんさつ" },
  { kanji: "健康", yomi: "けんこう" },
  { kanji: "発熱", yomi: "はつねつ" },
  { kanji: "要", yomi: "かなめ" },
  { kanji: "詩集", yomi: "ししゅう" },
  { kanji: "待つ", yomi: "まつ" },
  { kanji: "自治会", yomi: "じちかい" },
  { kanji: "送付", yomi: "そうふ" },
  { kanji: "積む", yomi: "つむ" },
  { kanji: "漁夫", yomi: "ぎょふ" },
  { kanji: "面積", yomi: "めんせき" },
  { kanji: "以外", yomi: "いがい" },
  { kanji: "徒歩", yomi: "とほ" },
  { kanji: "街灯", yomi: "がいとう" },
  { kanji: "貨物船", yomi: "かもつせん" },
  { kanji: "配給", yomi: "はいきゅう" },
  { kanji: "結ぶ", yomi: "むすぶ" },
  { kanji: "量", yomi: "りょう" },
  { kanji: "関連", yomi: "かんれん" },
  { kanji: "一輪", yomi: "いちりん" },
  { kanji: "散る", yomi: "ちる" },
  { kanji: "後半", yomi: "こうはん" },
  { kanji: "庭", yomi: "にわ" },
];
const QUESTIONS_PER_SET = 10;
// —— 設定ここまで ——

// 置き換え前の shuffle を削除して、これを入れる
function shuffle<T>(arr: T[] | null | undefined): T[] {
  if (!Array.isArray(arr)) return [];     // ガード
  const a = arr.slice();                  // スプレッドより安全
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function toArray(y: string | string[]) {
  return Array.isArray(y) ? y : [y];
}
function normalizeHiragana(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u30a1-\u30f6]/g, (m) => String.fromCharCode(m.charCodeAt(0) - 0x60)); // カタカナ→ひらがな
}

// ローカルストレージキー
const LS_KEY = "kanji-drill-history-v1";

type Result = {
  id: string; // kanji+yomi 主キー
  correct: boolean;
  timestamp: number;
  mode: "read" | "write";
};

type Props = {};

// =====================================
// コンポーネント本体
// =====================================
export default function App({ }: Props) {
  const [mode, setMode] = useState<"read" | "write">("read");
  const [seed, setSeed] = useState(0); // リセット用

  // 履歴
  const [history, setHistory] = useState<Result[]>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? (JSON.parse(raw) as Result[]) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(history));
  }, [history]);

  // CSV差し替え用のソース
  type KanjiItem = (typeof KANJI_LIST)[number];
  const [sourceList, setSourceList] = useState<KanjiItem[]>(KANJI_LIST);
  const lastListRef = useRef<KanjiItem[]>(KANJI_LIST);

  const handleImportCSV: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await f.text();

    lastListRef.current = sourceList;
    localStorage.setItem("kanji_list_backup", JSON.stringify(sourceList));

    const parsed: KanjiItem[] = text
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const [k, y = ""] = line.split(",");
        const yomi = y.includes("/") ? y.split("/").map((s) => s.trim()) : y.trim();
        return { kanji: (k || "").trim(), yomi };
      });

    setSourceList(parsed); // 全入れ替え
    setIndex(0);
    setChecked(null);
    e.currentTarget.value = "";
  };

  // 問題リスト（このセット分）
  const [questions, setQuestions] = useState<typeof KANJI_LIST>([]);
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState("");
  const [checked, setChecked] = useState<null | boolean>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1) 問題セット生成（シンプル版）
  useEffect(() => {
    if (!Array.isArray(sourceList) || sourceList.length === 0) {
      setQuestions([]);
      return;
    }
    const n = Math.min(QUESTIONS_PER_SET, sourceList.length);
    const picked = shuffle(sourceList).slice(0, n); // 単純シャッフル
    setQuestions(picked);
  }, [sourceList, seed, mode]);  // ★ history / weightMap は一旦外す

  // 2) セット開始時の初期化
  useEffect(() => {
    setIndex(0);
    setUser("");
    setChecked(null);
    inputRef.current?.focus();
  }, [seed, mode]);

  const current = questions[index];

  const correctAnswers = useMemo(() => {
    if (mode === "read") {
      return toArray(current?.yomi || []).map((y) => normalizeHiragana(y));
    }
    return [current?.kanji ?? ""];
  }, [current, mode]);

  // —— 判定
  function check() {
    if (!current) return;
    let ok = false;
    if (mode === "read") {
      ok = correctAnswers.includes(normalizeHiragana(user));
    } else {
      ok = user.trim() === current.kanji;
    }
    setChecked(ok);

    const id = `${current.kanji}|${toArray(current.yomi).join("/")}`;
    setHistory((h) => [...h, { id, correct: ok, timestamp: Date.now(), mode }]);

    if (ok) {
      setTimeout(() => {
        if (index < questions.length - 1) {
          setIndex((i) => i + 1);
          setUser("");
          setChecked(null);
          inputRef.current?.focus();
        }
      }, 600);
    }
  }

  // —— 次の問題へ
  function next() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setUser("");
      setChecked(null);
      inputRef.current?.focus();
    }
  }

  // —— 新しい10問
  function resetSet() {
    setSeed((s) => s + 1);
  }

  // —— 直近スコア
  const score = useMemo(() => {
    const ids = new Set(questions.map((q) => `${q.kanji}|${toArray(q.yomi).join("/")}`));
    const recent = history.filter((r) => ids.has(r.id)).slice(-100);
    const correct = recent.filter((r) => r.correct).length;
    const total = recent.length || 1;
    return Math.round((correct / total) * 100);
  }, [questions, history]);

  // ======= ここから JSX =======
  return (
    <div>
       <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      {/* ▼ヘッダー（タイトル＋ツールバー） */}

      <div
        style={{
          display: "flex",
          gap: 16,
          flexDirection: "column",
          alignItems: "stretch",
          marginBottom: 24,
        }}
      >
        {/* タイトル */}
        <div style={{ textAlign: "left" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>漢字ドリル10</h1>
          <p style={{ fontSize: 12, color: "#6b7280", margin: "6px 0 0" }}>
            10問ずつ練習／間違えた漢字は出やすくなるよ
          </p>
        </div>

        {/* ▼ ツールバー */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap", // 画面が狭い時だけ折り返す
          }}
        >
          {/* 左：モード + CSV + 復元 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {/* ← モードは1行固定（2段にならない） */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
              <label style={{ fontSize: 12 }}>モード：</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as "read" | "write")}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  height: 40,
                  padding: "0 12px",
                  background: "#fff",
                }}
              >
                <option value="read">漢字 → よみ（ひらがな入力）</option>
                <option value="write">よみ → 漢字（変換して確定）</option>
              </select>
            </div>

            {/* CSVボタンは文字を折り返さない */}
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 40,
                padding: "0 14px",
                borderRadius: 16,
                background: "#f3f4f6",
                color: "#111827",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 2px rgba(0,0,0,.04)",
                cursor: "pointer",
                whiteSpace: "nowrap", // ★ これで二段化＆カッコ分離を防止
              }}
              title="CSVファイルで漢字リストを差し替え"
            >
              <input type="file" accept=".csv" onChange={handleImportCSV} hidden />
              CSV読込
            </label>

            <button
              onClick={() => setSourceList(lastListRef.current)}
              style={{
                height: 40, padding: "0 14px", borderRadius: 16,
                background: "#f3f4f6", color: "#111827", border: "1px solid #e5e7eb",
                boxShadow: "0 1px 2px rgba(0,0,0,.04)", cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              1つ前に戻す
            </button>
            <button
              onClick={() => setSourceList(KANJI_LIST)}
              style={{
                height: 40, padding: "0 14px", borderRadius: 16,
                background: "#f3f4f6", color: "#111827", border: "1px solid #e5e7eb",
                boxShadow: "0 1px 2px rgba(0,0,0,.04)", cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              既定に戻す
            </button>
          </div>

          {/* 右：新しい10問（高さを40に合わせると並びが綺麗） */}
          <button
            onClick={resetSet}
            style={{
              border: "none",
              borderRadius: 16,
              height: 40, // ★ 高さ統一
              padding: "0 14px",
              background: "#111827",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,.12)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            新しい10問
          </button>
        </div>
      </div>

      {/* ▼ 白カード（本体UI） */}
      <section
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 6px 24px rgba(0,0,0,.08)",
          padding: 24,
        }}
      >
        {/* 進捗・スコア */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
            fontSize: 14,
            color: "#6b7280",
          }}
        >
          <div>
            {index + 1} / {questions.length} 問
          </div>
          <div>
            直近スコア：<span style={{ fontWeight: 600, color: "#111827" }}>{score}%</span>
          </div>
        </div>

        {/* 履歴リセット */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          style={{
            marginTop: 8,
            marginBottom: 8,
            padding: "8px 12px",
            background: "#f3f4f6",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          リセット
        </button>

        {/* 出題エリア */}
        {current && (
          <>
            <div style={{ textAlign: "center", margin: "24px 0" }}>
              {mode === "read" ? (
                <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: 2 }}>{current.kanji}</div>
              ) : (
                <div style={{ fontSize: 22, color: "#374151" }}>
                  「{toArray(current.yomi).join(" / ")}」を書いてね
                </div>
              )}
            </div>

            {/* 入力・操作 */}
            <div style={{ display: "flex", gap: 8 }}>
              <input
                ref={inputRef}
                value={user}
                onChange={(e) => setUser(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (checked === null) check();
                    else if (index < questions.length - 1) next();
                  }
                }}
                placeholder={mode === "read" ? "ひらがなで入力" : "漢字で入力（変換して確定）"}
                style={{
                  flex: 1,
                  border: "1px solid " + (checked === null ? "#d1d5db" : checked ? "#10b981" : "#ef4444"),
                  background: checked === null ? "#fff" : checked ? "#ecfdf5" : "#fef2f2",
                  borderRadius: 12,
                  padding: "12px 16px",
                  fontSize: 18,
                  outline: "none",
                }}
              />

              {checked === null ? (
                <button
                  onClick={check}
                  style={{
                    border: "none",
                    borderRadius: 16,
                    padding: "12px 16px",
                    background: "#111827",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,.1)",
                  }}
                >
                  判定
                </button>
              ) : index < questions.length - 1 ? (
                <button
                  onClick={next}
                  style={{
                    border: "none",
                    borderRadius: 16,
                    padding: "12px 16px",
                    background: "#1f2937",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  次へ
                </button>
              ) : (
                <button
                  onClick={resetSet}
                  style={{
                    border: "none",
                    borderRadius: 16,
                    padding: "12px 16px",
                    background: "#4f46e5",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  もう一度（新しい10問）
                </button>
              )}
            </div>

            {/* 判定結果 */}
            {checked !== null && (
              <div style={{ marginTop: 12, fontSize: 14 }}>
                {checked ? (
                  <div style={{ color: "#047857" }}>◎ 正解！</div>
                ) : (
                  <div style={{ color: "#b91c1c" }}>
                    × 不正解。正解：
                    {mode === "read" ? (
                      <span style={{ fontWeight: 600 }}>
                        {toArray(current.yomi).join(" / ")}（{current.kanji}）
                      </span>
                    ) : (
                      <span style={{ fontWeight: 600 }}>
                        {current.kanji}（{toArray(current.yomi).join(" / ")}）
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* フッター文言 */}
        <div style={{ marginTop: 24, fontSize: 12, color: "#6b7280", textAlign: "left" }}>
          <p>使い方：モードを選んで10問に回答。Enterキーで判定/次へ。問題は間違えたものが出やすくなります。</p>
          <p>編集方法：ファイル先頭の <code>KANJI_LIST</code> に漢字と読みを追加／学年ごとに配列を切り替えるのもおすすめ。</p>
        </div>
      </section>
    </div>
    </div>
  );
}