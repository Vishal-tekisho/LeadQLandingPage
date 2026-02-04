import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:5173", wait_until="commit", timeout=10000)

        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass

        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass

        # Interact with the page elements to simulate user flow
        # -> Navigate to http://localhost:5173
        await page.goto("http://localhost:5173", wait_until="commit", timeout=10000)
        
        # -> Reload the app root to attempt to trigger SPA initialization (reload the page). If the reload still yields no interactive elements, prepare to report a website issue or try alternative navigation.
        await page.goto("http://localhost:5173/", wait_until="commit", timeout=10000)
        
        # -> Navigate directly to the profile research/enrichment demo route to try to load the UI (http://localhost:5173/profile-research). If that page is blank, prepare to report a website issue.
        await page.goto("http://localhost:5173/profile-research", wait_until="commit", timeout=10000)
        
        # -> Click the 'Scan Now' button to open the profile research/enrichment demo and observe the AI-driven enrichment steps, data population, and any UI animations for glitches.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/div/div/section[2]/div/div[1]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # -> Click the cookie banner 'Accept All' button to remove the overlay so the demo can be fully observed and verified.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/div[1]/div/div[5]/div/div/div/div[2]/button[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # -> Click the cookie banner 'Accept All' button (index 3571) to remove the overlay so the demo UI can be fully observed.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/div/div/div[5]/div/div/div/div[2]/button[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # -> Click the 'Start Research Demo' / 'Scan Now' button (index 2287) to run the enrichment workflow and observe AI-driven enrichment steps, animations, and final enriched profile results.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/div[1]/div/section[3]/div[2]/div[1]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # -> Advance the demo one step (click 'Next') to trigger enrichment, wait for the UI to update, then extract the enriched profile fields (Verified Identity, Role, Email, Company, AI Summary) to verify accuracy and check for UI glitches.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/div[1]/div/section[2]/div/div[2]/div[4]/div/div/div[2]/div[2]/div[4]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # -> Click the fresh 'Next' button (index 3952) to advance the enrichment, wait for the UI to update, then extract the enriched profile fields (Verified Identity, Role, Email, Company, AI Summary).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/div/div/section[2]/div/div[2]/div[4]/div/div/div[2]/div[2]/div[4]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        try:
            await expect(frame.locator('text=AI Profile Enrichment Complete').first).to_be_visible(timeout=3000)
        except AssertionError:
            raise AssertionError("Test case failed: The profile research/enrichment demo did not display the 'AI Profile Enrichment Complete' success text — the test was verifying that the demo shows clear AI-driven enrichment steps and final enriched profile results without UI glitches, but the expected result did not appear within the timeout.")
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    