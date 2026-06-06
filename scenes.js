// ════════════════════════════════════════════════════════════
// scenes.js — Interactive Storytelling 기말 프로젝트
//
// 영상은 videos/ 폴더에 원본 파일명 그대로 두면 됩니다.
// 미니게임 부분은 일단 단순 선택지 (choice_only) 로 placeholder 처리.
// 추후 진짜 게임 컴포넌트로 교체 가능.
// ════════════════════════════════════════════════════════════

window.START_SCENE = 's01_intro';

window.SCENES = {

  // ════════════════════════════════════════════════════════════
  // 1장 ~ 2장 — 세계관 + 군대 침입
  // ════════════════════════════════════════════════════════════
  's01_intro': {
    type: 'video',
    src: 'videos/1) 세계관 설명, 2-1)군대 침입.mp4',
    freeze_before_end: 1.0,
    slow_duration: 0.5,
    overlay: {
      type: 'choice',
      prompt: '쿵쿵쿵... 무슨 소리지?',
      options: ['재빨리 정리한다', '밖으로 나간다', '가만히 있는다'],
      duration: 15000
    },
    // 세 선택지 모두 같은 다음 씬으로 (스토리 분기 없음)
    next: {
      '재빨리 정리한다': 's03_meeting',
      '밖으로 나간다': 's03_meeting',
      '가만히 있는다': 's03_meeting',
      default: 's03_meeting'
    }
  },

  // ════════════════════════════════════════════════════════════
  // 3장 — 교수님 연행 + 회의 시작
  // ════════════════════════════════════════════════════════════
  's03_meeting': {
    type: 'video',
    src: 'videos/2-2)교수님 연행, 3-1) 회의 시작.mp4',
    freeze_before_end: 1.0,
    slow_duration: 0.5,
    overlay: {
      type: 'choice',
      prompt: '교실에 남겨진 우리. 어떻게 할까?',
      options: ['맨몸으로 뛰쳐나간다', '일단 더 생각해보자'],
      duration: 15000
    },
    // b 가 정답이지만 어떤 걸 골라도 결국 고양이가 등장
    next: {
      '맨몸으로 뛰쳐나간다': 's04_cat',
      '일단 더 생각해보자': 's04_cat',
      default: 's04_cat'
    }
  },

  // ════════════════════════════════════════════════════════════
  // 4장 — 고양이 등장 + 미완성 지도
  // ════════════════════════════════════════════════════════════
  's04_cat': {
    type: 'video',
    src: 'videos/4)고양이등장,5-1)미완성 지도 등장.mp4',
    next: 's05_map_game'   // 영상 끝나면 자동으로 지도 게임으로
  },

  // 미니게임: 두 지도(map + omap)를 정확히 겹쳐 완성
  // 청중 폰에서 omap 을 드래그해서 map 위에 정확히 정렬하면 성공
  // ★ 선착순 N명이 완성하면 게임 즉시 종료 + 완성자 명단 공개
  's05_map_game': {
    type: 'choice_only',
    overlay: {
      type: 'map_align',
      prompt: '🗺️ 두 지도를 정확히 겹쳐라 · 선착순 3명!',
      // ★ 게임 시작 전 안내 — 진행자가 시작 버튼 누를 때까지 대기
      pre_intro: {
        title: '🗺️ 두 지도를 합쳐라',
        description: [
          '청중 각자의 폰에 두 장의 지도가 보입니다',
          '빨간 지도(위)를 손가락으로 드래그해서 아래 지도와 정확히 겹쳐 보세요',
          '선착순 3명이 정렬에 성공하면 미션 클리어!'
        ],
        button_label: '🗺️ 지도 정렬 시작'
      },
      // GitHub 저장소 루트(=audience.html 옆) 에 이 두 파일을 올려두면 됨
      map_src: 'map.png',
      omap_src: 'omap.png',
      // 선착순 몇 명이 완성하면 성공으로 칠지
      winners_needed: 3,
      // omap 의 정답 위치 (스테이지 폭/높이 % · 50,50 = 정중앙 = map 과 완전히 일치)
      target_x_pct: 50,
      target_y_pct: 50,
      // 정답으로 인정할 허용 오차 (%)  ← 너무 어려우면 6~8 로, 너무 쉬우면 2~3 으로
      tolerance_pct: 4,
      // 시작 시 정답에서 얼마나 벗어나서 시작할지 (%)  ← 게임 난이도 조절
      start_dx_pct: 22,
      start_dy_pct: -14,
      duration: 30000
    },
    next: { success: 's05_complete', default: 's05_complete' }
  },

  // ════════════════════════════════════════════════════════════
  // 5장 — 지도 완성 + 타워 진입
  // ════════════════════════════════════════════════════════════
  's05_complete': {
    type: 'video',
    src: 'videos/5-2)지도완성 부터 6-1) 캡슐 떨군 것까지.mp4',
    // 영상에 캡슐 떨어지는 장면까지 포함됐다고 가정
    next: 'chapter6_title'
  },

  // ════════════════════════════════════════════════════════════
  // 6장 — 머리의 방
  // ════════════════════════════════════════════════════════════
  // 챕터 타이틀 카드 — 진행자가 클릭할 때까지 대기
  'chapter6_title': {
    type: 'chapter_title',
    chapter_label: '제 6장',
    title: '머리의 방',
    next: 's06_1_decision'
  },

  // 6-1) 캡슐 떨어짐, 어떻게 할까?
  's06_1_decision': {
    type: 'choice_only',
    overlay: {
      type: 'choice',
      prompt: '캡슐이 굴러갔다. 우리의 소중한 추억인데..',
      options: ['구하러 간다', '모른 척 한다', '조력자에게 도움 요청'],
      duration: 15000
    },
    next: {
      '구하러 간다': 's06_1_hero',
      '모른 척 한다': 's06_1_ignore',
      '조력자에게 도움 요청': 's06_1_helper',
      default: 's06_1_hero'
    }
  },

  // 6-1 A) 주인공이 구하러 감 → 구출 성공
  's06_1_hero': {
    type: 'video',
    src: 'videos/6-1-1 주인공이 구하러 감 .mp4',
    next: 's06_2_decision'
  },

  // 6-1 B) 모른 척 → 조력자가 비난, 신뢰도 하락 → 6-3 로 바로 (6-2 시선분산 스킵)
  's06_1_ignore': {
    type: 'video',
    src: 'videos/6-1-3 가지러 가지 않음.mp4',
    next: 's06_3_pre'
  },

  // 6-1 C) 조력자가 구하러 감 → 구출 성공, 부상
  's06_1_helper': {
    type: 'video',
    src: 'videos/6-1-2 조력자가 구하러 감.mp4',
    next: 's06_2_decision'
  },

  // 6-2) 사이렌 — 시선 분산 결정
  's06_2_decision': {
    type: 'video',
    src: 'videos/6-2 시선 분산 할지 말지.mp4',
    freeze_before_end: 0.3,
    slow_duration: 0.1,
    overlay: {
      type: 'choice',
      prompt: '사이렌이 울렸다. 어떻게 이동할까?',
      options: ['그룹을 나눠 시선 분산', '일단 다 같이 간다'],
      duration: 10000
    },
    next: {
      '그룹을 나눠 시선 분산': 's06_2_split',
      '일단 다 같이 간다': 's06_2_together',
      default: 's06_2_split'
    }
  },

  's06_2_split': {
    type: 'video',
    src: 'videos/6-2 시선 분산 함.mp4',
    next: 's06_3_pre'
  },

  's06_2_together': {
    type: 'video',
    src: 'videos/6-2 시선 분산안함.mp4',
    next: 's06_3_pre'
  },

  // 6-3) 머리의 방 - 컴퓨터 논리 파괴
  's06_3_pre': {
    type: 'video',
    src: 'videos/6-3 머리방 게임 시작 전.mp4',
    next: 's06_3_game'
  },

  // 미니게임: 논리 파괴 (3번 반복) — TODO: 실제 게임 컴포넌트
  's06_3_game': {
    type: 'choice_only',
    overlay: {
      type: 'choice',
      prompt: '💻 논리 FILE:"아기는 귀엽다/여름엔 덥다/ ___"',
      options: ['햄버거 좋아하는 이순신', '강아지 좋아하는 강형욱'],
      duration: 10000
    },
    next: {
      '햄버거 좋아하는 이순신': 's06_3_done',
      '강아지 좋아하는 강형욱': 's06_3_done',
      default: 's06_3_done'
    }
  },

  's06_3_done': {
    type: 'video',
    src: 'videos/6-3 머리방 게임 클리어.mp4',
    next: 'chapter7_title'
  },

  // ════════════════════════════════════════════════════════════
  // 7장 — 장의 방 (군사 처벌 시스템)
  // ════════════════════════════════════════════════════════════
  'chapter7_title': {
    type: 'chapter_title',
    chapter_label: '제 7장',
    title: '장의 방',
    next: 's07_1_blackout'
  },

  // 7-1) 암전
  's07_1_blackout': {
    type: 'video',
    src: 'videos/7-1 암전.mp4',
    freeze_before_end: 1.0,
    slow_duration: 0.5,
    overlay: {
      type: 'choice',
      prompt: '앞이 보이지 않는다.',
      options: ['서로 어깨를 잡고 이동', '고양이의 도움'],
      duration: 10000
    },
    next: {
      '서로 어깨를 잡고 이동': 's07_1a',
      '고양이의 도움': 's07_1b',
      default: 's07_1a'
    }
  },

  's07_1a': {
    type: 'video',
    src: 'videos/7-1-1 암전 속 서로의 어깨를 잡으며 이동함.mp4',
    next: 's07_2_door'
  },

  's07_1b': {
    type: 'video',
    src: 'videos/7-1-2 고양이 눈 손전등.mp4',
    next: 's07_2_door'
  },

  // 7-2) 댐핑 - 타이밍 미니게임 (중간 pause 필요)
  // TODO: freeze_at 정확한 시점 확인 필요
  's07_2_door': {
    type: 'video',
    src: 'videos/7-2 탭핑(중간에 pause 필요).mp4',
    // 영상 정중앙쯤 멈추도록 임시 설정 — 실제 영상 보고 조정
    freeze_at: 16.0,
    slow_duration: 0.3,
    resume_after_overlay: true,  // 탭 단계 끝난 후 멈춘 지점부터 영상 끝까지 재생
    overlay: {
      type: 'choice',
      prompt: '⏰ 타이밍을 맞춰 문을 통과하라!',
      options: ['지금!'],
      duration: 2500,
      result_mode: 'success_fail',   // 옵션 막대 대신 성공/실패 패널 표시
      success_threshold: 1,          // 한 명이라도 누르면 성공
      success_text: '통과!',
      fail_text: '통과 실패...'
    },
    next: { success: 's07_3_robot', fail: 'gameover_door' }
  },

  // 7-2 실패 → GAME OVER → 7-2 재시도
  'gameover_door': {
    type: 'gameover',
    sub: '문을 통과하지 못했습니다',
    duration: 3500,
    next: 's07_2_door'
  },

  // 7-3) 광클로 군사 로봇 5개 파괴 (QTE 연타)
  's07_3_robot': {
    type: 'video',
    src: 'videos/7-3 로봇 죽이기 탭핑(중간에 pause 필요).mp4',
    freeze_at: 6.0,   // TODO: 실제 영상 보고 조정
    slow_duration: 0.5,
    resume_after_overlay: true,  // 연타 끝난 후 멈춘 지점부터 영상 끝까지 재생
    overlay: {
      type: 'qte_burst',
      prompt: '💥 합심해서 300회 두드려 시스템을 파괴하라!',
      pre_intro: {
        title: '💥 시스템 파괴 — 합심 연타',
        description: [
          '제한시간 10초 안에 모두 합쳐서 화면을 300번 두드려야 합니다',
          '버튼을 미친듯이 빠르게 연타하세요!',
          '실패 시 GAME OVER — 다시 시도해야 합니다'
        ],
        button_label: '💥 연타 시작'
      },
      tap_target_total: 30,
      tap_target_per_user: 100,
      duration: 10000,
      result_mode: 'success_fail',
      success_threshold: 30,        // 누적 탭 300 이상이면 성공
      success_text: '시스템 파괴 성공!',
      fail_text: '시스템 파괴 실패'
    },
    next: { success: 'chapter8_title', fail: 'gameover_robot' }
  },

  // 7-3 실패 → GAME OVER → 7-3 재시도
  'gameover_robot': {
    type: 'gameover',
    sub: '시스템 파괴 실패',
    duration: 3500,
    next: 's07_3_robot'
  },

  // ════════════════════════════════════════════════════════════
  // 8장 — 가슴의 방 (감정 억제 칩)
  // ════════════════════════════════════════════════════════════
  'chapter8_title': {
    type: 'chapter_title',
    chapter_label: '제 8장',
    title: '가슴의 방',
    next: 's08_1_enter'
  },

  // 8-1) 입성 — 과한 감정 선택
  's08_1_enter': {
    type: 'video',
    src: 'videos/8-1 가슴의 방_입성.mp4',
    freeze_before_end: 0.8,
    slow_duration: 0.5,
    overlay: {
      type: 'choice',
      prompt: '😵‍💫 과한 감정이 몰려온다. 어떤 감정에 휩쓸릴까?',
      options: ['😡 분노', '😱 두려움', '🍺 쾌락'],
      duration: 12000
    },
    next: {
      '😡 분노': 's08_1_anger',
      '😱 두려움': 's08_1_fear',
      '🍺 쾌락': 's08_1_pleasure',
      default: 's08_1_anger'
    }
  },

  's08_1_anger': {
    type: 'video',
    src: 'videos/8-1 가슴의 방_분노.mp4',
    next: 's08_1_resolve'
  },

  's08_1_fear': {
    type: 'video',
    src: 'videos/8-1 가슴의 방_두려움.mp4',
    next: 's08_1_resolve'
  },

  's08_1_pleasure': {
    type: 'video',
    src: 'videos/8-1 가슴의 방_쾌락.mp4',
    next: 's08_1_resolve'
  },

  // 8-1 후속 — 고양이가 의문 제기, 위험 요소 찾기 시작
  's08_1_resolve': {
    type: 'video',
    src: 'videos/8-1 가슴의 방_괴로움 해결(게임시작).mp4',
    next: 's08_2_hidden'
  },

  // 8-2) 위험요소 찾기 — Match-3 미니게임 (애니팡 / 캔디크러쉬 스타일)
  //   인접한 두 타일을 탭해서 자리 바꿈 → 같은 이모지 3개 가로/세로로 일렬 시 제거
  //   🔫 🔪 🏏 각각 최소 1번씩 매칭 성공시키면 미션 클리어
  //   선착순 3명이 클리어하면 즉시 다음 씬으로
  's08_2_hidden': {
    type: 'choice_only',
    overlay: {
      type: 'match3',
      prompt: '🔍 위험 요소를 모두 없애라 (🔫 🔪 🏏)',
      pre_intro: {
        title: '🔍 위험요소 제거 — 매치 3',
        description: [
          '청중 각자의 폰에 이모지 그리드가 보입니다',
          '인접한 두 타일을 스와이프 또는 두 번 탭해서 자리를 바꾸세요',
          '같은 이모지 3개를 가로/세로 일렬로 만들면 제거됩니다',
          '🔫 🔪 🏏 위험요소 3종류를 각각 한 번씩 매치해서 없애면 클리어!',
          '선착순 3명이 클리어하면 미션 성공'
        ],
        button_label: '🔍 매치 게임 시작'
      },
      dangers: ['🔫', '🔪', '🏏'],     // 제거해야 할 위험 요소
      safes:   ['🍎', '🍋', '🍇', '🍓', '🌸'],  // 무난한 채움용 이모지
      rows: 7,
      cols: 6,
      winners_needed: 3,                // 선착순 N명이 클리어하면 미션 성공
      duration: 60000                   // 1분 제한 (선착순 다 채워지면 조기 종료)
    },
    next: { success: 's08_2_calm', default: 's08_2_calm' }
  },

  // 8-3) 위험요소 파괴 후 진정 → 인질극 직전
  //     (USB 선택지는 8-4 영상 뒤로 이동했음)
  's08_2_calm': {
    type: 'video',
    src: 'videos/8-2(원래는 4)_인질극 직전.mp4',
    next: 's08_3_branch'
  },

  // 6-1 의 선택에 따라 8-4 a 또는 8-4 b 로 분기
  //   '구하러 간다' / '모른 척 한다'   → 8-4 a (주인공이 직접 캡슐 가져온 흐름)
  //   '조력자에게 도움 요청'           → 8-4 b (조력자가 캡슐 가져온 흐름)
  's08_3_branch': {
    type: 'branch',
    if_choice_from: 's06_1_decision',
    next: {
      '구하러 간다':         's08_3a',
      '모른 척 한다':         's08_3a',
      '조력자에게 도움 요청': 's08_3b',
      default:               's08_3a'
    }
  },

  // 8-4 A) 영상 후 USB 선택지
  's08_3a': {
    type: 'video',
    src: 'videos/8-4 a.mp4',
    freeze_before_end: 1.0,
    slow_duration: 0.5,
    overlay: {
      type: 'choice',
      prompt: '🤖 로봇: "조력자를 살리려면 USB를 내놔라"',
      options: ['💾 USB 를 넘긴다 (조력자 구출)', '⚔️ 조력자를 포기한다 (USB 사수)'],
      duration: 15000
    },
    next: {
      '💾 USB 를 넘긴다 (조력자 구출)': 's08_5_rescue',
      '⚔️ 조력자를 포기한다 (USB 사수)': 's08_5_giveup',
      default: 's08_5_rescue'
    }
  },

  // 8-4 B) 영상 후 동일한 USB 선택지
  's08_3b': {
    type: 'video',
    src: 'videos/8-4 b.mp4',
    freeze_before_end: 1.0,
    slow_duration: 0.5,
    overlay: {
      type: 'choice',
      prompt: '🤖 로봇: "조력자를 살리려면 USB를 내놔라"',
      options: ['💾 USB 를 넘긴다 (조력자 구출)', '⚔️ 조력자를 포기한다 (USB 사수)'],
      duration: 15000
    },
    next: {
      '💾 USB 를 넘긴다 (조력자 구출)': 's08_5_rescue',
      '⚔️ 조력자를 포기한다 (USB 사수)': 's08_5_giveup',
      default: 's08_5_rescue'
    }
  },

  // (예전 's08_4_give_usb' / 's08_4_sacrifice' 는 8-4 a/b 영상이 위로 이동하면서
  //  더 이상 도달하지 않게 됨 → 제거)

  // 8-5) A 루트: 인질 구출, USB 없음... 그러나 고양이가 복제본 숨겨둠
  //   13초 시점에서 영상 정지 → 청중이 실제로 USB 찾기 → 진행자가 "✓ 찾았다" 누르면 이어 재생
  's08_5_rescue': {
    type: 'video',
    src: 'videos/8-5 인질 구출(usb 찾을때 pause).mp4',
    freeze_at: 13.0,
    slow_duration: 0.5,
    resume_after_overlay: true,   // 성공 누르면 영상 끝까지 이어서 재생
    overlay: {
      type: 'manual',              // 청중 입력 없이 진행자가 수동으로 진행
      prompt: '🔎 청중이 실제 USB 를 찾는 중...',
      advance_label: '✓ 찾았다 — 영상 이어서 재생',
      duration: 999999             // 자동 만료 안 되도록 큰 값 (실제로는 수동 종료)
    },
    next: { default: 'chapter9_title' }
  },

  // 8-5 B 루트: 조력자 사망 보여줌 → 9-1
  's08_5_giveup': {
    type: 'video',
    src: 'videos/8-5 인질 포기.mp4',
    next: 'chapter9_title'
  },

  // ════════════════════════════════════════════════════════════
  // 9장 — 중앙제어 시스템 (흑막)
  // ════════════════════════════════════════════════════════════
  'chapter9_title': {
    type: 'chapter_title',
    chapter_label: '제 9장 · 최종',
    title: '중앙제어 시스템',
    next: 's09_villain_before'
  },

  // 9-1) 흑막 등장, USB 꽂을지 결정
  's09_villain_before': {
    type: 'video',
    src: 'videos/흑막 스토리_usb 꽂기전.mp4',
    freeze_before_end: 1.0,
    slow_duration: 0.5,
    overlay: {
      type: 'choice',
      prompt: '🎯 어떻게 할까?',
      options: ['💾 USB 를 꽂는다', '🤔 USB 를 꽂지 않는다'],
      duration: 15000
    },
    // B 를 골라도 결국 A 로 가게 만듦 (강제 분기)
    next: {
      '💾 USB 를 꽂는다': 's09_villain_after',
      '🤔 USB 를 꽂지 않는다': 's09_villain_after',
      default: 's09_villain_after'
    }
  },

  // 9-2) USB 꽂은 후 — 흑막이 권총을 머리에 조준
  's09_villain_after': {
    type: 'video',
    src: 'videos/흑막 스토리_usb 꽂고 난 후_ 설득하냐마냐.mp4',
    freeze_before_end: 1.0,
    slow_duration: 0.5,
    overlay: {
      type: 'choice',
      prompt: '🔫 흑막이 방아쇠를 당기려 한다',
      options: ['🚷 섣불리 나서지 않는다', '🗣️ 흑막을 설득한다'],
      duration: 15000
    },
    next: {
      '🚷 섣불리 나서지 않는다': 'ending_die',
      '🗣️ 흑막을 설득한다': 'ending_stop',
      default: 'ending_die'
    }
  },

  // ════════════════════════════════════════════════════════════
  // 엔딩
  // ════════════════════════════════════════════════════════════
  // 엔딩 1: 흑막 자살
  'ending_die': {
    type: 'video',
    src: 'videos/말리지 않는 엔딩.mp4',
    next: 'final_credits'
  },

  // 엔딩 2: 흑막 설득 성공
  'ending_stop': {
    type: 'video',
    src: 'videos/말리는 엔딩.mp4',
    next: 'final_credits'
  },

  // 최종 크레딧 — 영화 엔딩 크레딧처럼 아래에서 위로 스크롤
  'final_credits': {
    type: 'credits',
    duration: 90000,          // 90초에 걸쳐 스크롤 (메시지가 많아서 더 길게)
    title: '🎬 The End',
    subtitle: '함께 만든 이야기',
    producers: ['천소람', '차예령', '김찬영', '최상빈'],
    supervisor: '주연경 교수님',
    course: 'INTERACTIVE STORYTELLING',
    // 수강생/교수님 응원 메시지 — 크레딧에 함께 흘러감
    messages: [
      { name: '수아',     text: '어려운 수업 마지막까지 재밌게 마무리 하십시다.' },
      { name: '강백호',   text: '화이팅' },
      { name: '이제열',   text: '고생 많으셨어요!!' },
      { name: '문지영',   text: '고생하셨습니다 이 수업을 통해 내손으로 만든 제작물들을 많이 얻을 수 있어서 너무 뿌듯했어용' },
      { name: '류승민',   text: '고생많으셨습니다...' },
      { name: '김승현',   text: '다양한 사람들의 머릿 속을 들여다볼 수 있는 시간이어서 흥미로웠습니다. 다들 수고하셨어요!' },
      { name: '심은지',   text: '수업을 같이 듣는 모든 분들 너무 친절해서 좋았어요! 다들 행복하세요!' },
      { name: '윤지현',   text: '개개인의 작품을 보면서 다양한 관점으로 생각할 수 있게 되었습니다. 감사합니다!' },
      { name: '슌레이뇨', text: '다들 수고하셨고 기말고사 파이팅하세요!' },
      { name: '최진성',   text: '15주 간 모두 수고했어요' },
      { name: '김준희',   text: '창작이라는 수업을 처음 수강해봐서 많은 어려움이 있었지만, 살아가면서 해볼 수 없는 경험이었기에 나름 재밌게 수강했습니다.' },
      { name: '안지원',   text: '저희학과에서 이렇게 다같이 응원하고, 분위기좋은 수업을 들을수있어서 좋았습니다.' },
      { name: '휘엔',     text: '표현은 서툴렀지만 정말 즐거웠고 많이 배운 수업이었습니다. 모두 멋지셨습니다! 감사합니다.' },
      { name: '이은서',   text: '화이팅입니다~!!' },
      { name: '교수님',   text: '감사합니다' }
    ],
    closing: '2025-1 수강생들\n한 학기 동안 수고 많으셨습니다 ✨'
  }

};
