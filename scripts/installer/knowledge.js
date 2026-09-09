import fs from 'node:fs';
import path from 'node:path';
import { KNOWLEDGE_DESTINATIONS } from './engine.js';

export function knowledgeTransfers(plan, backup) {
  const backupRoot = typeof backup === 'string' ? backup : backup?.backup;
  if (!backupRoot) return [];
  return (plan?.actions || []).filter((action) => ['replace', 'remove'].includes(action.kind || action.action) && KNOWLEDGE_DESTINATIONS[action.path?.split(':')[0]]).map((action) => {
    const source = path.posix.join(backupRoot.split(path.sep).join('/'), 'files', action.path.split(':')[0]);
    const destination = KNOWLEDGE_DESTINATIONS[action.path.split(':')[0]];
    return { source, destination: destination.destination, reason: destination.reason, status: 'Pending human transfer' };
  });
}

export function writeKnowledgeChecklist(backupRoot, items) {
  if (!items?.length) return null;
  const target = path.join(backupRoot, 'knowledge-transfer.md');
  const lines = ['# Knowledge transfer', '', 'The installer preserved these consumer-owned sources. Review and transfer content manually.', ''];
  for (const item of items) lines.push(`- Source: ${item.source}`, `  Destination: ${item.destination}`, `  Reason: ${item.reason}`, `  Status: ${item.status}`, '');
  fs.writeFileSync(target, `${lines.join('\n')}\n`);
  return target;
}

export function prepareKnowledge(plan, prepared) {
  const items = knowledgeTransfers(plan, prepared); if (items.length && prepared?.backup) writeKnowledgeChecklist(path.resolve(prepared.targetRoot, prepared.backup), items); return items;
}

export default { knowledgeTransfers, writeKnowledgeChecklist, prepareKnowledge };
