const codeInput = document.getElementById('codeInput');
const diagnoseBtn = document.getElementById('diagnoseBtn');
const clearBtn = document.getElementById('clearBtn');
const outputContent = document.getElementById('outputContent');
const loadingState = document.getElementById('loadingState');
const analysisState = document.getElementById('analysisState');
const year = document.getElementById('year');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

year.textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

clearBtn.addEventListener('click', () => {
  codeInput.value = '';
  outputContent.innerHTML = '<p class="muted">Your AI-powered feedback will appear here.</p>';
  analysisState.textContent = 'Waiting';
});

diagnoseBtn.addEventListener('click', async () => {
  const code = codeInput.value.trim();

  if (!code) {
    outputContent.textContent = 'Please paste some code first so CodeDoctor AI can diagnose it.';
    analysisState.textContent = 'Input needed';
    return;
  }

  analysisState.textContent = 'Analyzing';
  loadingState.classList.remove('hidden');
  outputContent.textContent = '';

  await new Promise((resolve) => setTimeout(resolve, 1400));

  const lines = code.split('\n').length;
  const hasConsoleLog = /console\.log|print\(/.test(code);
  const hasLoop = /for\s*\(|while\s*\(|for\s+\w+\s+in/.test(code);

  const feedback = [
    'Diagnosis Summary:',
    `- Parsed ${lines} line(s) of code.`,
    hasConsoleLog
      ? '- Logging statements found. Consider removing debug logs before production release.'
      : '- No obvious debug log statements detected.',
    hasLoop
      ? '- Loop detected. Ensure exit conditions are safe to avoid infinite loops.'
      : '- No loops detected in this snippet.',
    '- Suggestion: Add stronger error handling and input validation for safer execution.',
    '- Optimization Tip: Refactor repeated logic into functions to improve readability and testability.',
  ].join('\n');

  loadingState.classList.add('hidden');
  outputContent.textContent = feedback;
  analysisState.textContent = 'Complete';
});
