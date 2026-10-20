/**
 * Business inboxes that receive lead notifications. Both variables are optional:
 * unset or blank ones are skipped, so this can return one, two or zero addresses.
 * BUSINESS_EMAIL is still honored as a fallback for BUSINESS_EMAIL_1 so older
 * deployments keep delivering until their env is renamed.
 */
export function getBusinessRecipients(): string[] {
  const candidates = [
    process.env.BUSINESS_EMAIL_1 ?? process.env.BUSINESS_EMAIL,
    process.env.BUSINESS_EMAIL_2,
  ];
  const seen = new Set<string>();
  return candidates
    .map((value) => (value ?? "").trim())
    .filter((email) => {
      const key = email.toLowerCase();
      if (!email || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}
