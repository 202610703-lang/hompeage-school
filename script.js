document.addEventListener('DOMContentLoaded', () => {

  // 1. 모바일 메뉴 토글 (Responsive Navigation)
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // 2. 공지사항 탭 필터링 (Tab Filter)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const noticeItems = document.querySelectorAll('#noticeList li');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 버튼 활성화 스타일 변경
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedTab = btn.getAttribute('data-tab');

      noticeItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (selectedTab === 'all' || selectedTab === category) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 3. 오늘의 급식 메뉴 데이터 및 토글 (Meal Data & Toggle)
  const meals = {
    lunch: {
      items: ["친환경 쌀밥", "해물순두부찌개", "돈육불고기", "계란말이", "깍두기", "신선 과일"],
      calories: "820 kcal"
    },
    dinner: {
      items: ["치킨마요덮밥", "팽이버섯장국", "떡볶이", "단무지무침", "포기김치", "우리쌀 식혜"],
      calories: "780 kcal"
    }
  };

  const lunchBtn = document.getElementById('lunchBtn');
  const dinnerBtn = document.getElementById('dinnerBtn');
  const mealMenuList = document.getElementById('mealMenuList');
  const mealCal = document.getElementById('mealCal');

  function renderMeal(type) {
    mealMenuList.innerHTML = '';
    const mealData = meals[type];

    mealData.items.forEach(food => {
      const li = document.createElement('li');
      li.className = 'meal-item';
      li.textContent = food;
      mealMenuList.appendChild(li);
    });

    mealCal.textContent = mealData.calories;
  }

  lunchBtn.addEventListener('click', () => {
    lunchBtn.classList.add('active');
    dinnerBtn.classList.remove('active');
    renderMeal('lunch');
  });

  dinnerBtn.addEventListener('click', () => {
    dinnerBtn.classList.add('active');
    lunchBtn.classList.remove('active');
    renderMeal('dinner');
  });

  // 초기 중식 메뉴 렌더링
  renderMeal('lunch');
});

// 4. 모달 팝업 컨트롤러 (Notice Modal)
function openModal(title, body) {
  const modal = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
}

// 모달 바깥 영역 클릭 시 닫기
window.addEventListener('click', (e) => {
  const modal = document.getElementById('modal');
  if (e.target === modal) {
    closeModal();
  }
});