// ════════════════════════════════════════════════════════════
// scenes.js — 게임 흐름 정의
//
// 이 파일만 수정하면 게임 시나리오를 바꿀 수 있어요.
// main.html 엔진 코드는 안 건드려도 됩니다.
// ════════════════════════════════════════════════════════════

window.START_SCENE = 'start';

window.SCENES = {

  // 첫 씬: 예시 영상 1개 + 끝 부근 슬로우 → 프리징 → 선택지
  start: {
    type: 'video',
    src: 'videos/example.mp4',

    // 영상이 끝나기 N초 전부터 슬로우 시작 (= 결정 지점)
    // 정확한 시점을 쓰려면 freeze_at 사용 (둘 중 하나만)
    freeze_before_end: 3.0,
    // freeze_at: 8.5,           // 또는 8.5초 지점에 정확히 프리징

    // 슬로우 → 완전 정지까지 걸리는 시간(초). 시각 효과용
    slow_duration: 2.0,

    // freeze 후 표시될 오버레이 (청중 폰에도 자동 전송)
    overlay: {
      type: 'choice',
      prompt: '어떻게 할까?',
      options: ['🔥 강행한다', '🌿 물러난다'],
      duration: 10000           // 청중 투표 시간 (ms)
    },

    // 투표 결과 → 다음 씬으로 분기
    next: {
      '🔥 강행한다': 'ending_a',
      '🌿 물러난다': 'ending_b',
      default: 'ending_a'       // 무투표 시 기본 결말
    }
  },

  // ─── 결말 A ───
  ending_a: {
    type: 'ending',
    title: '결말 A',
    subtitle: '강행의 길',
    description: '용기 있는 자만이 다다를 수 있는 결말이다.',
    color: '#00d68f',           // 강조 색
    // src: 'videos/ending_a.mp4',   // 결말 영상 있으면 추가
  },

  // ─── 결말 B ───
  ending_b: {
    type: 'ending',
    title: '결말 B',
    subtitle: '신중함의 길',
    description: '살아남은 자에게 또 다른 기회가 찾아온다.',
    color: '#ff3d71',
    // src: 'videos/ending_b.mp4',
  }

  // ════════════════════════════════════════════════════════════
  // 더 추가하려면:
  //
  // s02_chase: {
  //   type: 'video',
  //   src: 'videos/chase.mp4',
  //   freeze_before_end: 2,
  //   slow_duration: 1.5,
  //   overlay: { type: 'qte', prompt: '⚡ 점프!', duration: 2000, threshold: 0.5 },
  //   next: { success: 's03_safe', fail: 's03_fall' }
  // }
  // ════════════════════════════════════════════════════════════
};
